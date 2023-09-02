import { mainnet, watchBlockNumber } from '@wagmi/core';
import { useEffect, useState } from 'react';

export const BlockNumber = () => {
  const [blockNumber, setBlockNumber] = useState<bigint>();

  useEffect(() => {
    const unwatch = watchBlockNumber({ chainId: mainnet.id, listen: true }, setBlockNumber);

    return () => {
      unwatch();
    };
  }, []);

  return (
    <div className="flex items-center text-sm">
      <div className="mr-1">current block:</div>
      <div className="font-bold">{blockNumber?.toString() ?? '-'}</div>
    </div>
  );
};
