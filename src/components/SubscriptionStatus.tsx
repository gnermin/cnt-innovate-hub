import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

interface SubscriptionData {
  subscribed: boolean;
  product_id?: string;
  subscription_end?: string;
}

export const SubscriptionStatus = () => {
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const { toast } = useToast();

  const checkSubscription = async () => {
    setChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;
      
      setSubscription(data);
      
      if (data.subscribed) {
        toast({
          title: "Pretplata aktivna",
          description: `Vaša pretplata je aktivna do ${new Date(data.subscription_end).toLocaleDateString('hr-HR')}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Greška",
        description: error.message || "Nije moguće provjeriti status pretplate",
        variant: "destructive",
      });
    } finally {
      setChecking(false);
      setLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Greška",
        description: error.message || "Nije moguće otvoriti portal",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkSubscription();
    
    // Check subscription status every 30 seconds
    const interval = setInterval(checkSubscription, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Provjeravam status pretplate...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Status Članarine</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={checkSubscription}
            disabled={checking}
          >
            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {subscription?.subscribed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Članarina je aktivna</span>
            </div>
            
            {subscription.subscription_end && (
              <p className="text-sm text-muted-foreground">
                Obnavlja se: {new Date(subscription.subscription_end).toLocaleDateString('hr-HR')}
              </p>
            )}

            <Button 
              variant="outline" 
              onClick={openCustomerPortal}
              className="w-full"
            >
              Upravljaj Pretplatom
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">Članarina nije aktivna</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Molimo aktivirajte članarinu za pristup svim pogodnostima centra.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
