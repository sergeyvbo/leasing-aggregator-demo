import React from 'react';

// Stepper component props interface
export interface StepperProps {
  currentStep: number; // 1, 2, 3, или 4
  selectedCompany: string | null; // Название выбранной компании
  selectedSubject: string | null; // Выбранный предмет лизинга
  selectedVehicle: string | null; // Марка и модель автомобиля
  selectedProduct: string | null; // Выбранное лизинговое предложение
  onStepClick: (step: number) => void; // Callback для навигации
}

// Step configuration
const STEPS = [
  {
    id: 1,
    title: 'Выбор контрагента',
  },
  {
    id: 2,
    title: 'Предмет лизинга',
  },
  {
    id: 3,
    title: 'Предварительный расчет',
  },
  {
    id: 4,
    title: 'Коммерческое предложение',
  }
];

// Step state type
type StepState = 'completed' | 'active' | 'future';

const Stepper: React.FC<StepperProps> = ({
  currentStep,
  selectedCompany,
  selectedSubject,
  selectedVehicle,
  selectedProduct,
  onStepClick
}) => {

  // Function to determine step state based on current step
  const getStepState = (stepId: number): StepState => {
    if (currentStep > stepId) return 'completed';
    if (currentStep === stepId) return 'active';
    return 'future';
  };

  // Function to determine if a step is clickable
  const isStepClickable = (stepId: number): boolean => {
    // Allow navigation to:
    // 1. All previous steps (completed)
    // 2. Current step (active)
    // 3. Next step if current step has required data
    if (stepId <= currentStep) {
      return true; // Can always go back or stay on current step
    }
    
    // For forward navigation, check if current step has required data
    if (stepId === currentStep + 1) {
      switch (currentStep) {
        case 1:
          // Can go to step 2 if company is selected
          return selectedCompany !== null;
        case 2:
          // Can go to step 3 if subject and vehicle are selected
          return selectedSubject !== null && selectedVehicle !== null;
        case 3:
          // Can go to step 4 if product is selected
          return selectedProduct !== null;
        default:
          return false;
      }
    }
    
    return false; // Can't skip multiple steps ahead
  };

  // Handle step click - allow navigation based on new logic
  const handleStepClick = (stepId: number) => {
    if (isStepClickable(stepId)) {
      onStepClick(stepId);
    }
  };

  // Function to get step description based on selected data
  const getStepDescription = (stepId: number): string | null => {
    const stepState = getStepState(stepId);
    
    switch (stepId) {
      case 1:
        // Display selected company name only if step is completed
        return stepState === 'completed' ? selectedCompany : null;
      case 2:
        // Display selected subject and vehicle info only if step is completed
        if (stepState === 'completed') {
          if (selectedVehicle && selectedSubject) {
            return `${selectedSubject} • ${selectedVehicle}`;
          } else if (selectedSubject) {
            return selectedSubject;
          } else if (selectedVehicle) {
            return selectedVehicle;
          }
        }
        return null;
      case 3:
        // Show search description for active or completed step 3
        return stepState === 'active' || stepState === 'completed' ? 'Поиск предложений' : null;
      case 4:
        // Show selected product for active or completed step 4
        return stepState === 'active' || stepState === 'completed' ? selectedProduct : null;
      default:
        return null;
    }
  };
  return (
    <nav className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-3 sm:py-4">
        {/* Mobile: Compact horizontal layout */}
        <div className="flex md:hidden items-center justify-between space-x-2">
          {STEPS.map((step, index) => {
            const stepState = getStepState(step.id);
            const isClickable = isStepClickable(step.id);
            
            return (
              <React.Fragment key={step.id}>
                <div 
                  className={`flex items-center flex-1 min-w-0 transition-all duration-200 ${
                    isClickable ? 'cursor-pointer hover:opacity-80 hover:scale-105' : 'cursor-default opacity-60'
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  {/* Mobile Step Circle - smaller size */}
                  <div
                    className={`
                      flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 text-xs sm:text-sm font-medium transition-colors duration-200 flex-shrink-0
                      ${stepState === 'completed' 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : stepState === 'active' 
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                      }
                    `}
                  >
                    {stepState === 'completed' ? (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  
                  {/* Mobile Step Content - compact layout */}
                  <div className="ml-2 min-w-0 flex-1">
                    <div
                      className={`
                        text-xs sm:text-sm font-medium transition-colors duration-200 truncate
                        ${stepState === 'completed' || stepState === 'active' ? 'text-gray-900' : 'text-gray-500'}
                      `}
                    >
                      {step.title}
                    </div>
                    {/* Mobile Description - only show for active step to save space */}
                    {stepState === 'active' && getStepDescription(step.id) && (
                      <div className="text-xs text-gray-600 mt-0.5 truncate">
                        {getStepDescription(step.id)}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Mobile Connecting Line - shorter and thinner */}
                {index < STEPS.length - 1 && (
                  <div className="flex-shrink-0 mx-1">
                    <div
                      className={`
                        h-0.5 w-4 sm:w-6 transition-colors duration-200
                        ${stepState === 'completed' ? 'bg-green-500' : 'bg-gray-300'}
                      `}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Desktop: Original layout with improvements */}
        <div className="hidden md:flex md:items-center md:justify-center md:space-x-8">
          {STEPS.map((step, index) => {
            const stepState = getStepState(step.id);
            const isClickable = isStepClickable(step.id);
            
            return (
              <div key={step.id} className="flex items-center">
                {/* Desktop Step Item */}
                <div 
                  className={`flex items-center transition-all duration-200 ${
                    isClickable ? 'cursor-pointer hover:opacity-80 hover:scale-105' : 'cursor-default opacity-60'
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  {/* Desktop Step Circle */}
                  <div
                    className={`
                      flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 rounded-full border-2 text-sm lg:text-base font-medium transition-colors duration-200
                      ${stepState === 'completed' 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : stepState === 'active' 
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                      }
                    `}
                  >
                    {stepState === 'completed' ? (
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  
                  {/* Desktop Step Content */}
                  <div className="ml-3 lg:ml-4">
                    <div
                      className={`
                        text-sm lg:text-base font-medium transition-colors duration-200
                        ${stepState === 'completed' || stepState === 'active' ? 'text-gray-900' : 'text-gray-500'}
                      `}
                    >
                      {step.title}
                    </div>
                    {/* Desktop Description - always show if available */}
                    {getStepDescription(step.id) && (
                      <div className="text-xs lg:text-sm text-gray-600 mt-1 max-w-40 lg:max-w-48 truncate">
                        {getStepDescription(step.id)}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Desktop Connecting Line */}
                {index < STEPS.length - 1 && (
                  <div className="ml-6 lg:ml-8 mr-6 lg:mr-8">
                    <div
                      className={`
                        h-0.5 w-12 lg:w-16 transition-colors duration-200
                        ${stepState === 'completed' ? 'bg-green-500' : 'bg-gray-300'}
                      `}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Stepper;