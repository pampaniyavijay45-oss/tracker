import { useState } from 'react';
import { 
  Shield, 
  Bell, 
  Search, 
  History, 
  UserPlus, 
  MapPin, 
  UserX, 
  Globe, 
  Zap, 
  Settings,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

// --- Components ---

const Header = () => (
  <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
    <div className="flex items-center justify-between px-6 h-16 w-full max-w-md mx-auto">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        <span className="font-manrope font-extrabold text-primary tracking-tighter text-lg">Digital Sentinel</span>
      </div>
      <button className="p-2 rounded-full hover:bg-slate-50 transition-colors relative">
        <Bell className="w-6 h-6 text-slate-500" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>
    </div>
  </header>
);

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Zap },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-slate-100 pb-6 pt-3 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto px-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-200 active:scale-90",
                isActive ? "text-primary" : "text-slate-400 opacity-60 hover:opacity-100"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="font-manrope text-[10px] font-bold uppercase tracking-widest mt-1">{tab.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="w-1 h-1 bg-primary rounded-full mt-1"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

const DossierCard = ({ name, phone, location, time, image, isUnknown = false }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.02)] border border-slate-50"
  >
    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 flex items-center justify-center">
      {isUnknown ? (
        <UserX className="w-6 h-6 text-slate-400" />
      ) : (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      )}
      {!isUnknown && <div className="absolute bottom-1 right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white" />}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-on-surface">{name}</h4>
        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{time}</span>
      </div>
      <p className="text-sm text-on-secondary-container font-medium">{phone}</p>
      <div className="flex items-center gap-1 mt-1">
        <MapPin className="w-3 h-3 text-primary" />
        <span className="text-[10px] text-secondary font-semibold">{location}</span>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-md mx-auto px-6 pt-24 pb-32">
        {/* Welcome Hero */}
        <section className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold tracking-tight text-on-surface mb-2"
          >
            Hello, Investigator
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-secondary font-medium"
          >
            Whose location would you like to verify today?
          </motion.p>
        </section>

        {/* Intelligence Search Hub */}
        <section className="mb-10">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <input 
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter mobile number..."
              className="w-full h-16 pl-14 pr-32 bg-surface-container-high rounded-xl border-none text-on-surface placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-medium outline-none"
            />
            <button className="absolute right-3 top-2 bottom-2 px-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-bold text-sm tracking-wide shadow-lg shadow-primary/10 transition-transform active:scale-95">
              TRACK
            </button>
          </div>
        </section>

        {/* Quick Actions Bento */}
        <section className="grid grid-cols-2 gap-4 mb-12">
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-4 transition-all hover:bg-surface-container shadow-sm cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <History className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-on-surface">Check Recent</h3>
              <p className="text-xs text-on-secondary-container mt-1">12 active sessions</p>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-4 transition-all hover:bg-surface-container shadow-sm cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h3 className="font-bold text-on-surface">Add Contact</h3>
              <p className="text-xs text-on-secondary-container mt-1">Sync your circle</p>
            </div>
          </motion.div>
        </section>

        {/* Recent Track History */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-on-surface tracking-tight">Intelligence Dossier</h2>
            <button className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            <DossierCard 
              name="David Miller"
              phone="+1 (555) 012-3456"
              location="San Francisco, CA"
              time="2M AGO"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
            />
            <DossierCard 
              name="Sarah Jenkins"
              phone="+44 20 7946 0123"
              location="London, UK"
              time="1H AGO"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
            />
            <DossierCard 
              name="Unknown Entity"
              phone="+91 98765 43210"
              location="Mumbai, IN"
              time="5H AGO"
              isUnknown
            />
          </div>
        </section>

        {/* Visual Flourish / Map Placeholder */}
        <section className="mt-12 rounded-3xl overflow-hidden h-48 relative bg-slate-900 shadow-xl group">
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
            alt="Map" 
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <Globe className="w-10 h-10 text-white mb-2" />
            <p className="text-white text-xs font-bold tracking-widest uppercase">Global Live Matrix</p>
            <div className="mt-3 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] text-white font-bold border border-white/10">
              142 NUMBERS ONLINE
            </div>
          </div>
        </section>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Background Decoration */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />
    </div>
  );
}
