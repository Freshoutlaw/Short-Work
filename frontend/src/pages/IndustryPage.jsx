// IndustryPage.jsx
import { useParams } from 'react-router-dom';
import { AuditQuiz } from '../components/forms/AuditQuiz';

const industryData = {
  plumbers: { headline: 'Plumbers: Turn leaks into leads', pain: 'Missing 70% of emergency calls due to low visibility' },
  electricians: { headline: 'Electricians: Spark your online presence', pain: 'Losing to national chains that don’t care' },
  restaurants: { headline: 'Restaurants: Fill every table', pain: 'Your food is great, but no one sees it' },
  salons: { headline: 'Salons: Book out weeks in advance', pain: 'Clients go elsewhere because they forget you exist' },
  builders: { headline: 'Builders: Build trust before the first call', pain: 'No portfolio = no high-value projects' },
};

export const IndustryPage = () => {
  const { slug } = useParams();
  const data = industryData[slug] || industryData.builders;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">{data.headline}</h1>
        <p className="text-xl text-red-400 mt-4">{data.pain}</p>
        <div className="mt-12 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why {slug} choose ShortWork</h2>
            <ul className="space-y-2">
              <li>✓ 10x more local visibility</li>
              <li>✓ Videos that show real work</li>
              <li>✓ Generate leads while you sleep</li>
            </ul>
            <div className="mt-8">
              <AuditQuiz />
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="text-4xl mb-2">🎥</div>
            <p>Example: A {slug} went from 200 → 15k followers in 90 days. See how →</p>
          </div>
        </div>
      </div>
    </div>
  );
};