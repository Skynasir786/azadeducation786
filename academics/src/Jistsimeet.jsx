import React from 'react';

const JitsiMeeting = ({ roomName = 'AzadEducationRoom' }) => {
  return (
    <div className="w-full h-[70vh] rounded-xl overflow-hidden shadow-lg border border-gray-300">
      <iframe
        src={`https://meet.jit.si/${roomName}`}
        allow="camera; microphone; fullscreen; display-capture"
        title="Jitsi Meeting"
        className="w-full h-full border-none"
      ></iframe>
    </div>
  );
};

export default JitsiMeeting;
