import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import { ExternalLink } from 'lucide-react';

export default function ProjectsGrid({ themeColor = 'green', playClickSound }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const textPrimary = themeColor === 'green' ? 'text-[#00ff66]' : 'text-[#00f0ff]';
  const borderPrimary = themeColor === 'green' ? 'border-[#00ff66]/40' : 'border-[#00f0ff]/40';
  const bgPrimary = themeColor === 'green' ? 'bg-[#00ff66]/10' : 'bg-[#00f0ff]/10';
  const hoverBorder = themeColor === 'green' ? 'hover:border-[#00ff66]' : 'hover:border-[#00f0ff]';
  const hoverShadow = themeColor === 'green' ? 'hover:shadow-[0_0_20px_rgba(0,255,102,0.15)]' : 'hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]';

  const getProjectPreview = (projectId) => {
    switch(projectId) {
      case 'project-a':
        return (
          <div className="bg-black/90 p-4 rounded-lg border border-neutral-900 font-code text-[10px] leading-relaxed text-neutral-400 overflow-x-auto h-40">
            <div className="text-neutral-500 font-bold">// TALLY SYSTEM ARCHITECTURE</div>
            <div className="flex gap-2"><span className="text-[#ff5f56]">GET</span><span>/api/v1/tally/sync/</span></div>
            <div>STATUS: <span className="text-[#00ff66]">200 OK</span></div>
            <div className="text-neutral-600">{"{"}</div>
            <div className="pl-4">"ledger_sync": <span className="text-[#00ff66]">true</span>,</div>
            <div className="pl-4">"vouchers_processed": <span className="text-[#00ff66]">1482</span>,</div>
            <div className="pl-4">"auto_billing_queue": "ACTIVE"</div>
            <div className="text-neutral-600">{"}"}</div>
            <div className="text-neutral-500 mt-2">&gt; Python sync process listening...</div>
          </div>
        );
      case 'project-b':
        return (
          <div className="bg-black/90 p-4 rounded-lg border border-neutral-900 font-code text-[10px] leading-relaxed text-neutral-400 overflow-x-auto h-40">
            <div className="text-neutral-500 font-bold">// DRONE AUTO-PILOT NAV CONTEXT</div>
            <div>&gt; import dronekit, cv2, openai</div>
            <div>&gt; connect('udp:127.0.0.1:14550')</div>
            <div>HEADING: <span className={textPrimary}>348.27°</span> | ALT: <span className={textPrimary}>12.5m</span></div>
            <div>LLM AGENT: <span className="text-white">"Scouting terrain. Node active."</span></div>
            <div className="text-neutral-600">[o] Camera matrix loaded: 640x480 FPS: 30</div>
            <div className="w-full bg-neutral-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className={`h-full ${themeColor === 'green' ? 'bg-[#00ff66]' : 'bg-[#00f0ff]'} w-2/3 animate-pulse`}></div>
            </div>
          </div>
        );
      case 'project-c':
        return (
          <div className="bg-black/90 p-4 rounded-lg border border-neutral-900 font-code text-[10px] leading-relaxed text-neutral-400 overflow-x-auto h-40">
            <div className="text-neutral-500 font-bold">// K-MART COMMERCE SCHEMA</div>
            <table className="w-full text-left mt-1.5 border-collapse text-neutral-500">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="pb-1">Entity</th>
                  <th className="pb-1">Constraint</th>
                  <th className="pb-1">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-neutral-300">
                  <td>order_id</td>
                  <td className={textPrimary}>PRIMARY</td>
                  <td>VARCHAR(36)</td>
                </tr>
                <tr>
                  <td>total_cost</td>
                  <td>NOT NULL</td>
                  <td>DECIMAL(10,2)</td>
                </tr>
                <tr>
                  <td>store_id</td>
                  <td className="text-yellow-600">FOREIGN</td>
                  <td>VARCHAR(12)</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto border-t border-neutral-900/60 relative font-grotesk">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className={`font-code text-xs tracking-widest ${textPrimary} uppercase block mb-2`}>
            // WORKSPACE & DEPLOYMENTS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Real-World Projects
          </h2>
        </div>
        <p className="text-neutral-400 text-sm max-w-md mt-4 md:mt-0 leading-relaxed">
          Production software and research explorations bridging retail business analysis, legacy financial systems, and modern AI algorithms.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-neutral-950 rounded-xl border border-neutral-900 p-6 h-96 animate-pulse flex flex-col justify-between">
              <div>
                <div className="h-6 bg-neutral-900 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-neutral-900 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-neutral-900 rounded w-full mb-6"></div>
                <div className="h-32 bg-neutral-900 rounded mb-4"></div>
              </div>
              <div className="h-8 bg-neutral-900 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-neutral-950/80 rounded-xl border border-neutral-900 p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-sm group ${hoverBorder} ${hoverShadow}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-code text-[10px] text-neutral-500 uppercase tracking-widest">
                    {project.category}
                  </span>
                  <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] border ${borderPrimary} ${bgPrimary} ${textPrimary} font-code font-semibold`}>
                    <span className={`w-1 h-1 rounded-full ${themeColor === 'green' ? 'bg-[#00ff66]' : 'bg-[#00f0ff]'} animate-pulse`}></span>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors flex items-center justify-between">
                  {project.title}
                  <a
                    href={project.link}
                    onClick={() => playClickSound()}
                    className="text-neutral-500 hover:text-white transition-colors"
                    title="Open Repository"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </h3>

                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  {getProjectPreview(project.id)}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className="px-2 py-1 rounded bg-neutral-900 text-neutral-400 text-[10px] font-code border border-neutral-800"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] text-neutral-500 font-code flex items-center justify-between border-t border-neutral-900 pt-3">
                  <span>ROLE: {project.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
