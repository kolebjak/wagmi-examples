import { connect, disconnect, getAccount, watchAccount } from '@wagmi/core';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog';
import { displayAddress } from '@/lib/address.ts';
import { injectedConnector } from '@/lib/connector.ts';

export const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState(getAccount());

  const handleConnect = async () => connect({ connector: injectedConnector });
  const handleDisconnect = async () => {
    setIsOpen(false);
    await disconnect();
  };

  useEffect(() => {
    const unwatch = watchAccount((account) => setAccount(account));

    return () => {
      unwatch();
    };
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild={true}>
          {account.isConnected ? (
            <Button size="sm" variant="outline" onClick={() => setIsOpen(true)}>
              {displayAddress(account.address)}
            </Button>
          ) : (
            <Button size="sm" onClick={handleConnect}>
              connect wallet
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="whitespace-nowrap">
              Account {displayAddress(account.address)}
            </DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-center">
              <Button size="sm" variant="outline" className="mt-4" onClick={handleDisconnect}>
                disconnect wallet
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
