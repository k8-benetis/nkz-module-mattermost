import React, { useEffect, useState } from 'react';
import { useTranslation, useViewer } from '@nekazari/sdk';

// Config - in production this would come from tenant config or env vars
const MATTERMOST_URL = 'https://chat.nkz.robotika.cloud';

const MattermostEmbed: React.FC = () => {
    const { t } = useTranslation(['common']);
    // const { tenant } = useAuth(); // If we needed tenant-specific URLs
    const [iframeHeight, setIframeHeight] = useState('calc(100vh - 64px)'); // Adjust for navbar

    // Handle window resize to keep iframe responsive
    useEffect(() => {
        const handleResize = () => {
            setIframeHeight('calc(100vh - 64px)');
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col w-full h-full bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
            {/* Header / Toolbar (Optional) */}
            <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm z-10">
                <div className="flex items-center gap-2">
                    <span className="text-lg">💬</span>
                    <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Team Chat
                    </h2>
                </div>
                <a
                    href={MATTERMOST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium px-3 py-1.5 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                    {t('open_in_new_tab', { defaultValue: 'Abrir en nueva pestaña' })} ↗
                </a>
            </div>

            {/* Mattermost Iframe */}
            <div className="flex-1 w-full relative">
                <iframe
                    src={MATTERMOST_URL}
                    className="w-full h-full border-0 absolute inset-0"
                    title="Mattermost Chat"
                    allow="camera; microphone; fullscreen; clipboard-read; clipboard-write"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

// Default export for the module loader
export default MattermostEmbed;
