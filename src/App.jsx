import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Issues from './pages/Issues';
import CreateIssue from './pages/CreateIssue';
import Notfound from './pages/Notfound';
import { IssueProvider } from './contexts/IssueContext';

function App() {
  return (
    <IssueProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="issue-tracking-app/" element={<Issues />} />
          <Route path="issue-tracking-app/issues" element={<Issues />} />
          <Route
            path="issue-tracking-app/create-issue"
            element={<CreateIssue />}
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </IssueProvider>
  );
}

export default App;
