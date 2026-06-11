import { useEffect, useRef } from 'react';

export default function InteractiveBackground({ themeColor = 'green', mode = 'matrix' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const primaryColor = themeColor === 'green' ? '#00ff66' : '#00f0ff';

    const fontSize = 20;
    let columns = Math.floor(canvas.width / (fontSize * 1.5)) + 1;
    let drops = Array(columns).fill(1);
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    const particles = [];
    const particleCount = Math.min(35, Math.floor((canvas.width * canvas.height) / 38000));
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouseRef.current.x != null && mouseRef.current.y != null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseRef.current.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            this.x += forceDirectionX * force * 0.8;
            this.y += forceDirectionY * force * 0.8;
          }
        }
      }

      draw() {
        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (mode === 'neural') {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    let frameCount = 0;

    const render = () => {
      if (mode === 'matrix') {
        frameCount++;
        if (frameCount % 3 === 0) {
          ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = primaryColor;
          ctx.font = `${fontSize}px "Fira Code", monospace`;

          const newColumns = Math.floor(canvas.width / (fontSize * 1.5)) + 1;
          if (newColumns !== columns) {
            columns = newColumns;
            drops = Array(columns).fill(1);
          }

          for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * (fontSize * 1.5);
            const y = drops[i] * fontSize;

            if (Math.random() > 0.98) {
              ctx.fillStyle = '#ffffff';
            } else {
              ctx.fillStyle = primaryColor;
            }

            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        }
      } else if (mode === 'neural') {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(30, 30, 30, 0.1)';
        ctx.lineWidth = 1;
        const gridSpacing = 80;
        for (let x = 0; x < canvas.width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              const alpha = (100 - dist) / 100;
              ctx.strokeStyle = `rgba(${themeColor === 'green' ? '0, 255, 102' : '0, 240, 255'}, ${alpha * 0.15})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColor, mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-18 bg-[#050505]"
    />
  );
}
