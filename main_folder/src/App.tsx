import React, { useState } from "react";
import {
  Header,
  Footer,
  HomePage,
  QueueStatusPage,
  BookingPage,
  DashboardPage,
  AdminPage,
  HelpFAQPage,
  SignInModal,
  SignUpModal,
} from "./components";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return <HomePage />;
      case "queue":
        return (
          <QueueStatusPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case "booking":
        return <BookingPage />;
      case "dashboard":
        return <DashboardPage />;
      case "admin":
        return <AdminPage />;
      case "help":
        return <HelpFAQPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setIsSignInOpen={setIsSignInOpen}
        setIsSignUpOpen={setIsSignUpOpen}
      />
      <SignInModal isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
      <SignUpModal isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} />
      <main className="pt-16">{renderContent()}</main>
      <Footer />
    </div>
  );
};

export default App;
