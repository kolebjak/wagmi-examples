import { Account } from '@/account.tsx';

import { BlockNumber } from './components/block-number.tsx';

function App() {
  return (
    <div>
      <div className="p-3 bg-gray-200 flex justify-end gap-x-3">
        <Account />
        <BlockNumber />
      </div>
      <div className="w-full h-full flex justify-center items-center flex-col">Content</div>
    </div>
  );
}

export default App;
