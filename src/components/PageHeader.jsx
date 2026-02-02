import React from 'react';
import BackButton from './BackButton';
import VoiceButton from './VoiceButton';

export default function PageHeader({ title, backTo = 'Home', voiceText }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <BackButton to={backTo} />
        {voiceText && <VoiceButton text={voiceText} size="large" />}
      </div>
      <h1 className="text-4xl font-bold text-gray-800 leading-tight">
        {title}
      </h1>
    </div>
  );
}
