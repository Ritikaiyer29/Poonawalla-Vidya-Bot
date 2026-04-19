import DailyIframe from '@daily-co/daily-js';
import { DailyProvider } from '@daily-co/daily-react';
import OnboardingDashboard from './components/OnboardingDashboard';

const callObject = DailyIframe.createCallObject();

function App() {
  return (
    <DailyProvider callObject={callObject}>
      <OnboardingDashboard />
    </DailyProvider>
  );
}
export default App;