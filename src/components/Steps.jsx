const steps = [
  { id: '1) Personal Details', name: 'Add your name', href: '#', status: 'complete' },
  { id: '2) Education', name: 'Add your education', href: '#', status: 'current' },
  { id: '3) Professional', name: 'Work Experience', href: '#', status: 'upcoming' },
]

export default function Steps() {
  return (
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
          {steps.map((step) => (
              <li key={step.name} className="md:flex-1">
                {step.status === 'complete' ? (
                    <a
                        href={step.href}
                        className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                    >
                      <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{step.id}</span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </a>
                ) : step.status === 'current' ? (
                    <a
                        href={step.href}
                        className="flex flex-col border-l-4 border-indigo-300 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                        aria-current="step"
                    >
                      <span className="text-sm font-medium text-indigo-600">{step.id}</span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </a>
                ) : (
                    <a
                        href={step.href}
                        className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                    >
                      <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.id}</span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </a>
                )}
              </li>
          ))}
        </ol>
      </nav>
  )
}
