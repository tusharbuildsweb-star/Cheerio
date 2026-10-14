import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: 1 | 2 | 3 | 4;
  isFailure?: boolean;
}

export const TroubleshootingStepper: React.FC<StepperProps> = ({ currentStep, isFailure = false }) => {
  const steps = [
    { num: 1, label: 'Select Issue' },
    { num: 2, label: 'Run Diagnostic' },
    { num: 3, label: 'Safe Resolution' },
    { num: 4, label: isFailure ? 'Escalation' : 'Verification' },
  ];

  return (
    <div className="bg-surface rounded-xl p-4 border border-line shadow-xs">
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium">
          Guided WhatsApp Troubleshooting
        </span>
        <span className="text-subtle font-mono text-[11px]">
          Step {currentStep} of 4
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 relative">
        {steps.map((step) => {
          const isDone = step.num < currentStep;
          const isActive = step.num === currentStep;

          return (
            <div key={step.num} className="space-y-1.5">
              {/* Progress line */}
              <div
                className={`h-1 rounded-full transition-all duration-200 ${
                  isDone
                    ? 'bg-success'
                    : isActive
                    ? isFailure
                      ? 'bg-warning'
                      : 'bg-[#6D45D9]'
                    : 'bg-stone-200'
                }`}
              />
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[10px] font-mono font-medium ${
                    isDone
                      ? 'text-success'
                      : isActive
                      ? isFailure
                        ? 'text-warning font-semibold'
                        : 'text-[#6D45D9] font-semibold'
                      : 'text-subtle'
                  }`}
                >
                  {isDone ? '✓' : `0${step.num}`}
                </span>
                <span
                  className={`text-xs truncate ${
                    isActive
                      ? 'font-medium text-charcoal'
                      : isDone
                      ? 'text-muted'
                      : 'text-subtle'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
