import React from 'react';

const VerifyEmailPage: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="glass p-8 rounded-xl max-w-md w-full border border-border shadow-2xl flex flex-col items-center">
        <h2 className="text-2xl font-heading mb-4 text-center text-text-DEFAULT">Verify Email</h2>
        <p className="text-text-secondary text-center mb-6">
          Please check your inbox and follow the link to verify your email address.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full py-2 bg-primary text-background font-medium rounded transition-opacity hover:opacity-90"
        >
          I have verified my email
        </button>
      </div>
    </div>
  );
};
export default VerifyEmailPage;
