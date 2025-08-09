import {
  FileText,
  User,
  UploadCloud,
  CreditCard,
  CheckCircle,
  Info
} from 'lucide-react';

interface StepProps {
  currentStep: string;
}

const steps = [
  { key: 'intro', label: 'Introduction', icon: Info },
  { key: 'conditions', label: 'Conditions', icon: FileText },
  { key: 'form', label: 'Formulaire', icon: User },
  { key: 'documents', label: 'Documents', icon: UploadCloud },
  { key: 'payment', label: 'Paiement', icon: CreditCard },
  { key: 'confirmation', label: 'Confirmation', icon: CheckCircle },
];

export const ProgressBar: React.FC<StepProps> = ({ currentStep }) => {
  const currentIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div 
      className="relative w-full overflow-x-auto px-2 scrollbar-hide"
      role="progressbar"
      aria-label="Progression de la demande"
      aria-valuenow={currentIndex + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
    >
      <div 
        className="flex items-center justify-between min-w-[600px] sm:min-w-full relative"
        role="list"
      >
        {/* Horizontale Fortschrittslinie */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-300 z-0" aria-hidden="true" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div 
              key={step.key} 
              className="relative z-10 flex flex-col items-center text-[10px] min-w-[60px] flex-1"
              role="listitem"
              aria-current={isActive ? 'step' : undefined}
            >
              <div 
                className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors
                  ${isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-blue-900 text-white' :
                      'bg-gray-300 text-gray-600'}`}
                aria-hidden="true"
              >
                <Icon size={12} />
              </div>
              <span className="mt-1 text-center leading-tight">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
