import { Steps } from "@/lib/works";

export const HowItWorks = () => {
  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Steps.map((step) => (
        <li
          key={step.title}
          className="flex flex-col items-center justify-center gap-4"
        >
          <span className="hover:animate-bounce-back">{step.icon}</span>
          <h2 className="text-lg font-semibold">{step.title}</h2>
          <p className="text-center text-sm text-muted-foreground">
            {step.description}
          </p>
        </li>
      ))}
    </ul>
  );
};
