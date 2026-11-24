import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider, useProgress } from './context/ProgressContext';

import DoniBirthday from './DoniBirthday';
import Countdown from './Countdown';
import Navbar from './Navbar';
import Timeline from './Timeline';         
import WhyILoveYou from './WhyILoveYou';  
import LoveQuiz from './LoveQuiz'; 
import ProposalTransition from './ProposalTransition'; 
import GiftRoom from './GiftRoom';
import SecretMessage from './SecretMessage'; 
import FutureTogether from './FutureTogether'; 
import FinalForever from './FinalForever';     
import Gallery from './Gallery';

// Protect everything
const ProtectedRoute = ({ children }) => {
  const { isUnlocked } = useProgress();
  
  if (!isUnlocked) {
    return <Navigate to="/countdown" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Countdown is the only page open before unlocking */}
        <Route path="/countdown" element={<Countdown />} />

        {/* Everything else is protected */}
        <Route path="/" element={<ProtectedRoute><><Navbar /><DoniBirthday /></></ProtectedRoute>} />
        <Route path="/gallery" element={<ProtectedRoute><><Navbar /><Gallery /></></ProtectedRoute>} />
        <Route path="/timeline" element={<ProtectedRoute><><Navbar /><Timeline /></></ProtectedRoute>} />
        <Route path="/why-i-love-you" element={<ProtectedRoute><><Navbar /><WhyILoveYou /></></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><><Navbar /><LoveQuiz /></></ProtectedRoute>} />
        <Route path="/future" element={<ProtectedRoute><><Navbar /><FutureTogether /></></ProtectedRoute>} />
        
        <Route path="/transition" element={<ProtectedRoute><ProposalTransition /></ProtectedRoute>} />
        <Route path="/gift-room" element={<ProtectedRoute><GiftRoom /></ProtectedRoute>} />
        <Route path="/secret-message" element={<ProtectedRoute><SecretMessage /></ProtectedRoute>} />
        <Route path="/final" element={<ProtectedRoute><FinalForever /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ProgressProvider>
      <AppRoutes />
    </ProgressProvider>
  );
}

export default App;