import React from 'react';
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore'; 

const SOLBalanceDisplay = () => {
  const balance = useUserSOLBalanceStore((s) => s.balance);

  return (
    <div className="text-white mt-4">
      SOL: {balance.toLocaleString() || 0}
    </div>
  );
};

export default SOLBalanceDisplay;
