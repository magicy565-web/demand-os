'use client';

import { useState } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { ViralTrackerMain } from "@/components/viral-tracker/ViralTrackerMain";
import { FactoryDirectory } from "@/components/factory/FactoryDirectory";
import { FactoryDetailPage } from "@/components/factory/FactoryDetailPage";
import { OpportunityFeed } from "@/components/opportunity/OpportunityFeed";
import { CaseStudyLibrary } from "@/components/case-study/CaseStudyLibrary";
import { CertificationSystem } from "@/components/certification/CertificationSystem";
import { InfluencerDashboard } from "@/components/workspace/InfluencerDashboard";
import { CollaborationRequestsPage } from "@/components/workspace/CollaborationRequestsPage";
import { ProjectTrackingPage } from "@/components/workspace/ProjectTrackingPage";
import { getFactoryById } from "@/data/factories";

type ViewType = 'tracker' | 'opportunities' | 'directory' | 'factory-detail' | 'case-studies' | 'certification' | 'workspace' | 'workspace-requests' | 'workspace-projects';

export default function ViralTrackerPage() {
  const [currentView, setCurrentView] = useState<ViewType>('opportunities');
  const [selectedFactoryId, setSelectedFactoryId] = useState<string | null>(null);

  const handleViewFactoryDetails = (id: string) => {
    setSelectedFactoryId(id);
    setCurrentView('factory-detail');
  };

  const handleBackToDirectory = () => {
    setCurrentView('directory');
    setSelectedFactoryId(null);
  };

  const selectedFactory = selectedFactoryId ? getFactoryById(selectedFactoryId) : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        onNavigate={(view) => setCurrentView(view as ViewType)}
        currentView={currentView}
      />
      <main>
        {currentView === 'tracker' && (
          <ViralTrackerMain 
            onSwitchToDirectory={() => setCurrentView('directory')}
            onSwitchToOpportunities={() => setCurrentView('opportunities')}
          />
        )}
        {currentView === 'opportunities' && (
          <OpportunityFeed onViewFactory={handleViewFactoryDetails} />
        )}
        {currentView === 'directory' && (
          <FactoryDirectory onViewFactoryDetails={handleViewFactoryDetails} />
        )}
        {currentView === 'factory-detail' && selectedFactory && (
          <FactoryDetailPage 
            factory={selectedFactory} 
            onBack={handleBackToDirectory}
          />
        )}
        {currentView === 'case-studies' && (
          <CaseStudyLibrary onViewFactory={handleViewFactoryDetails} />
        )}
        {currentView === 'certification' && (
          <CertificationSystem />
        )}
        {currentView === 'workspace' && (
          <InfluencerDashboard 
            onNavigateToRequests={() => setCurrentView('workspace-requests')}
            onNavigateToProjects={() => setCurrentView('workspace-projects')}
            onNavigateToFactories={() => setCurrentView('directory')}
          />
        )}
        {currentView === 'workspace-requests' && (
          <CollaborationRequestsPage 
            onBack={() => setCurrentView('workspace')}
            onViewFactory={handleViewFactoryDetails}
          />
        )}
        {currentView === 'workspace-projects' && (
          <ProjectTrackingPage 
            onBack={() => setCurrentView('workspace')}
            onViewFactory={handleViewFactoryDetails}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
