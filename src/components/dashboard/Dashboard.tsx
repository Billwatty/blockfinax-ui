import React, { useState } from 'react';
import DashboardStats from './DashboardStats';
import RecentTransactions from './RecentTransactions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { useWeb3 } from '../../hooks/useWeb3';
import { 
  Plus, Upload, Check, CreditCard, Clock, Wallet
} from 'lucide-react';
import { useContracts } from '../../hooks/useContracts';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../ui/tabs";

const ContractStatusOverview = () => {
  const { contracts, isLoadingContracts } = useContracts();
  
  const countByStatus = {
    DRAFT: 0,
    AWAITING_FUNDS: 0,
    ACTIVE: 0, // Combine FUNDED and GOODS_SHIPPED
    COMPLETED: 0
  };
  
  if (contracts && Array.isArray(contracts) && !isLoadingContracts) {
    contracts.forEach((contract: any) => {
      if (contract.status === 'DRAFT') {
        countByStatus.DRAFT += 1;
      } else if (contract.status === 'AWAITING_FUNDS') {
        countByStatus.AWAITING_FUNDS += 1;
      } else if (['FUNDED', 'GOODS_SHIPPED', 'GOODS_RECEIVED'].includes(contract.status)) {
        countByStatus.ACTIVE += 1;
      } else if (contract.status === 'COMPLETED') {
        countByStatus.COMPLETED += 1;
      }
    });
  }
  
  return (
    <div className="mt-8">
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 shadow-md">
        <CardHeader className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-primary">Contract Portfolio</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Asset Distribution</p>
        </CardHeader>
        <CardContent className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div>
                  <dl className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                    <div className="px-4 py-5 bg-white shadow-md rounded-lg overflow-hidden sm:p-6 border-l-4 border-l-slate-500">
                      <dt className="text-sm font-medium text-gray-500 truncate">Draft</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {isLoadingContracts ? '...' : countByStatus.DRAFT}
                      </dd>
                      <div className="mt-1 text-sm text-gray-500">Pending Finalization</div>
                    </div>
                    <div className="px-4 py-5 bg-white shadow-md rounded-lg overflow-hidden sm:p-6 border-l-4 border-l-amber-500">
                      <dt className="text-sm font-medium text-gray-500 truncate">Escrow Required</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {isLoadingContracts ? '...' : countByStatus.AWAITING_FUNDS}
                      </dd>
                      <div className="mt-1 text-sm text-gray-500">Awaiting Deposit</div>
                    </div>
                    <div className="px-4 py-5 bg-white shadow-md rounded-lg overflow-hidden sm:p-6 border-l-4 border-l-primary">
                      <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
                      <dd className="mt-1 text-3xl font-semibold text-primary">
                        {isLoadingContracts ? '...' : countByStatus.ACTIVE}
                      </dd>
                      <div className="mt-1 text-sm text-gray-500">In-Transit Assets</div>
                    </div>
                    <div className="px-4 py-5 bg-white shadow-md rounded-lg overflow-hidden sm:p-6 border-l-4 border-l-green-600">
                      <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                      <dd className="mt-1 text-3xl font-semibold text-green-600">
                        {isLoadingContracts ? '...' : countByStatus.COMPLETED}
                      </dd>
                      <div className="mt-1 text-sm text-gray-500">Settled Transactions</div>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const QuickActions = () => {
  return (
    <div className="mt-8">
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 shadow-md">
        <CardHeader className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-primary">Stablecoin Actions</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your stablecoins on Base Network</p>
        </CardHeader>
        <CardContent className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a href="/stablecoin">
              <div className="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-md flex items-center space-x-3 hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Stablecoin Wallet</p>
                  <p className="text-sm text-gray-500">Manage USDC, USDT, and DAI on Base</p>
                </div>
              </div>
            </a>
            
            <a href="/documents/upload">
              <div className="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-md flex items-center space-x-3 hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-slate-800 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Secure Documents</p>
                  <p className="text-sm text-gray-500">Upload verification docs</p>
                </div>
              </div>
            </a>
            
            <a href="/invoices">
              <div className="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-md flex items-center space-x-3 hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-600 flex items-center justify-center">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Invoice Payments</p>
                  <p className="text-sm text-gray-500">Pay with stablecoins</p>
                </div>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Dashboard = () => {
  const { isLoggedIn } = useWeb3();
  const { contracts } = useContracts();
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <div className="bg-primary/5 p-1 rounded-lg border border-primary/10">
            <TabsList className="bg-transparent">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md px-4 py-2.5">
                <CreditCard className="h-4 w-4 mr-2" />
                Stablecoin Dashboard
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md px-4 py-2.5">
                <Wallet className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="text-sm text-gray-500 flex items-center bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        
        <TabsContent value="overview" className="space-y-6 mt-0">
          <DashboardStats />
          <QuickActions />
          <ContractStatusOverview />
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-0">
          <RecentTransactions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
