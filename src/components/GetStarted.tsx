import { Rocket, ArrowRight } from 'lucide-react';
import { BorderBeam } from './magicui/border-beam';

interface GetStartedProps {
    username: string;
}

export function GetStarted({ username }: GetStartedProps) {
    return (
        <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
                <BorderBeam
                    className="opacity-50 rounded-full"
                    colorFrom="rgb(147, 51, 234)"
                    colorTo="rgb(79, 70, 229)"
                    duration={2}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                        <Rocket className="w-10 h-10 text-purple-500 animate-bounce" />
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Start Your Bolt Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-8">
                Hi {username}! Looks like you haven't created any Bolt projects yet.
                Let's build something amazing together!
            </p>
            <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 
                 bg-purple-600 dark:bg-purple-500 
                 text-white font-medium rounded-lg
                 hover:bg-purple-700 dark:hover:bg-purple-600 
                 transition-colors"
            >
                Create Your First Project
                <ArrowRight className="w-4 h-4" />
            </a>
        </div>
    );
} 