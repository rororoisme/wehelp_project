export default function PomodoroImage({ imageNumber }) {
    if (!imageNumber) {
      return null; // 默認0 的圖片
    }
  
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
        <img 
          src={`/pic/a${imageNumber}.png`} 
          alt={`Pomodoro ${imageNumber}`}
          style={{ 
            width: '90px', 
            height: '60px',
            maxWidth: '100%',
            maxHeight: '100%',
          }} 
        />
      </div>
    );
  }