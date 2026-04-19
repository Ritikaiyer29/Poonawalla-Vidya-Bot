import {
    DailyVideo,
    useDaily,
    useLocalParticipant,
    useParticipantIds
} from '@daily-co/daily-react';
import {
    Activity,
    AlertCircle,
    Camera,
    Fingerprint,
    MapPin,
    Mic,
    PhoneOff,
    ShieldCheck,
    UserCheck,
    Zap
} from 'lucide-react';
import React, { useState } from 'react';

const OnboardingDashboard: React.FC = () => {
  const callObject = useDaily();
  const participantIds = useParticipantIds();
  const localParticipant = useLocalParticipant();
  const [isLive, setIsLive] = useState(false);
  
  // Mock AI Intelligence State (This will later be updated via WebSockets)
  const [aiIntelligence] = useState({
    transcript: "Namaste, I am interested in a professional loan for my higher studies in AI...",
    age: 24,
    riskScore: "Low",
    location: "Mumbai, MH",
    liveness: "98.2%",
    geoFence: "Verified"
  });

  const startOnboarding = async () => {
    if (!callObject) return;
    try {
      // REPLACE with your actual Daily Room URL
      await callObject.join({ url: 'https://your-domain.daily.co/your-room-name' });
      setIsLive(true);
    } catch (e) {
      console.error("Join failed", e);
    }
  };

  const leaveCall = async () => {
    if (!callObject) return;
    await callObject.leave();
    setIsLive(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased text-slate-900">
      {/* Premium Header */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
            <Zap className="text-white fill-current" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase">
              Poonawalla <span className="text-red-600">Vidya-Bot</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agentic Onboarding Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            <Activity size={14} className={isLive ? "text-green-500 animate-pulse" : "text-slate-400"} />
            <span className="text-xs font-bold text-slate-600">{isLive ? "NEURAL LINK ACTIVE" : "ENGINE STANDBY"}</span>
          </div>
          <Fingerprint className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer" />
        </div>
      </header>

      <main className="flex-1 p-8 grid grid-cols-12 gap-8 max-w-[1600px] mx-auto w-full">
        
        {/* VIEWPORT: The Video Frame (Left 8 Columns) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="group relative bg-slate-900 rounded-[32px] aspect-video shadow-2xl overflow-hidden border-[8px] border-white ring-1 ring-slate-200">
            
            {/* Live Video Rendering */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900">
              {!isLive ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center animate-bounce">
                    <Camera className="text-red-600" size={32} />
                  </div>
                  <button 
                    onClick={startOnboarding}
                    className="px-10 py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-500/30 hover:scale-105 transition-all"
                  >
                    Initialize Secure Session
                  </button>
                  <p className="text-slate-500 text-sm font-medium">Verify Identity via Encrypted Video Link</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 h-full p-6">
                  {participantIds.map((id) => (
                    <div key={id} className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-800 shadow-inner">
                      <DailyVideo sessionId={id} type="video" className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                          {id === localParticipant?.session_id ? 'Applicant (You)' : 'AI Verification Officer'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Glass Control Bar */}
            {isLive && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 shadow-2xl z-20">
                <button className="p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all"><Mic size={20}/></button>
                <button className="p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all"><Camera size={20}/></button>
                <div className="w-px h-8 bg-white/20 mx-2" />
                <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all">
                  <ShieldCheck size={18} /> Capture Verbal Consent
                </button>
                <button onClick={leaveCall} className="p-4 rounded-2xl bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <PhoneOff size={20}/>
                </button>
              </div>
            )}

            {/* AI HUD Overlay */}
            <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
              <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">Session Geo-Tag</p>
                <p className="text-xs text-white font-mono flex items-center gap-2">
                  <MapPin size={10} className="text-red-500" /> {aiIntelligence.location}
                </p>
              </div>
            </div>
          </div>

          {/* Transcript Area */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Neural Transcript (Real-time)</h3>
               <div className="flex gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-ping delay-75" />
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-ping delay-150" />
               </div>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
              "{aiIntelligence.transcript}"
            </p>
          </div>
        </div>

        {/* SIDEBAR: AI Intelligence (Right 4 Columns) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Identity Guard Card */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Fingerprint size={80} />
            </div>
            
            <div className="flex items-center justify-between relative">
               <h3 className="text-sm font-bold text-slate-800">Identity Guard</h3>
               <UserCheck className="text-red-600" size={18} />
            </div>

            <div className="grid grid-cols-2 gap-4 relative">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-colors hover:bg-red-50">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">AI Age Est.</p>
                <p className="text-2xl font-black text-slate-800">{aiIntelligence.age}<span className="text-sm text-slate-400 ml-1 font-medium">yrs</span></p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-colors hover:bg-green-50">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Risk Profile</p>
                <p className="text-2xl font-black text-green-600">{aiIntelligence.riskScore}</p>
              </div>
            </div>

            <div className="space-y-3 relative">
               <div className="flex items-center justify-between text-xs font-semibold text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-red-500" />
                    Geo-Fence Status
                  </div>
                  <span className="text-slate-800 text-[10px] font-black uppercase tracking-widest">{aiIntelligence.geoFence}</span>
               </div>
               <div className="flex items-center justify-between text-xs font-semibold text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={14} className="text-amber-500" />
                    Liveness Score
                  </div>
                  <span className="text-slate-800 text-[10px] font-black tracking-widest">{aiIntelligence.liveness}</span>
               </div>
            </div>
          </div>

          {/* Policy Check List */}
          <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-200">
            <h3 className="text-sm font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-red-500" /> Automated Underwriting
            </h3>
            <ul className="space-y-4">
               {[
                 { label: "KYC Extraction", status: "Completed" },
                 { label: "Bureau Analysis", status: "In-Progress" },
                 { label: "Income Normalization", status: "Pending" },
                 { label: "Fraud Pattern Check", status: "Active" }
               ].map((item, i) => (
                 <li key={i} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-3 last:border-0">
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{item.label}</span>
                    <span className={`text-[9px] font-black tracking-widest px-2 py-1 rounded ${item.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40'}`}>
                      {item.status.toUpperCase()}
                    </span>
                 </li>
               ))}
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
};

export default OnboardingDashboard;