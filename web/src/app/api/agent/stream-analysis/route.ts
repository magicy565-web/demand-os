/**
 * API Route: Streaming Agent Flow Analysis
 * 
 * This endpoint implements Server-Sent Events (SSE) for real-time streaming
 * of agent workflow progress and results.
 * Implements Phase 1 Task 3 from the optimization plan.
 */

import { NextRequest } from 'next/server';

interface StreamMessage {
  type: 'step' | 'log' | 'result' | 'error' | 'complete';
  data: any;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  const { tiktokUrl } = await request.json();

  if (!tiktokUrl) {
    return new Response(
      JSON.stringify({ error: 'TikTok URL is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Create a TransformStream for streaming
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Helper function to send SSE message
  const sendMessage = async (message: StreamMessage) => {
    const data = `data: ${JSON.stringify(message)}\n\n`;
    await writer.write(encoder.encode(data));
  };

  // Start the agent flow in the background
  (async () => {
    try {
      // Step 1: Traffic Analysis
      await sendMessage({
        type: 'step',
        data: {
          id: 'step-1',
          agent: 'Traffic',
          action: 'Analyzing TikTok Trend Data',
          status: 'running',
        },
        timestamp: new Date().toISOString(),
      });

      await sendMessage({
        type: 'log',
        data: {
          stepId: 'step-1',
          message: `Initiating traffic analysis for: ${tiktokUrl}`,
        },
        timestamp: new Date().toISOString(),
      });

      await delay(500);

      // Call TikTok analysis API
      const trafficResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/agent/analyze-traffic`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tiktokUrl }),
        }
      );

      const trafficData = await trafficResponse.json();
      const analysis = trafficData.analysis;

      await sendMessage({
        type: 'log',
        data: {
          stepId: 'step-1',
          message: `Detected product: ${analysis.productName}`,
        },
        timestamp: new Date().toISOString(),
      });

      await delay(400);

      await sendMessage({
        type: 'log',
        data: {
          stepId: 'step-1',
          message: `Trend score: ${analysis.trendScore}/100`,
        },
        timestamp: new Date().toISOString(),
      });

      await sendMessage({
        type: 'step',
        data: {
          id: 'step-1',
          status: 'completed',
        },
        timestamp: new Date().toISOString(),
      });

      await delay(300);

      // Step 2: Factory Matching
      await sendMessage({
        type: 'step',
        data: {
          id: 'step-2',
          agent: 'Capacity',
          action: 'Matching Verified Factories',
          status: 'running',
        },
        timestamp: new Date().toISOString(),
      });

      await sendMessage({
        type: 'log',
        data: {
          stepId: 'step-2',
          message: 'Querying Directus for verified factories...',
        },
        timestamp: new Date().toISOString(),
      });

      await delay(600);

      const matchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/agent/match-factories`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productName: analysis.productName,
            category: analysis.category,
            keyFeatures: analysis.keyFeatures,
          }),
        }
      );

      const matchData = await matchResponse.json();
      const factories = matchData.matches || [];

      await sendMessage({
        type: 'log',
        data: {
          stepId: 'step-2',
          message: `Found ${factories.length} matching factories`,
        },
        timestamp: new Date().toISOString(),
      });

      await delay(400);

      if (factories.length > 0) {
        await sendMessage({
          type: 'log',
          data: {
            stepId: 'step-2',
            message: `Top match: ${factories[0].factoryName} (${factories[0].matchScore}% match)`,
          },
          timestamp: new Date().toISOString(),
        });
      }

      await sendMessage({
        type: 'step',
        data: {
          id: 'step-2',
          status: 'completed',
        },
        timestamp: new Date().toISOString(),
      });

      await delay(300);

      // Step 3: Financial Analysis
      await sendMessage({
        type: 'step',
        data: {
          id: 'step-3',
          agent: 'Financial',
          action: 'Calculating ROI & Pricing Tiers',
          status: 'running',
        },
        timestamp: new Date().toISOString(),
      });

      await sendMessage({
        type: 'log',
        data: {
          stepId: 'step-3',
          message: 'Calculating pricing tiers...',
        },
        timestamp: new Date().toISOString(),
      });

      await delay(500);

      const pricingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/agent/calculate-pricing`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productName: analysis.productName,
            category: analysis.category,
            trendScore: analysis.trendScore,
          }),
        }
      );

      const pricingData = await pricingResponse.json();
      const pricing = pricingData.pricing || {
        dropshipping: { price: 8.5, moq: 1 },
        wholesale: { price: 3.2, moq: 500 },
        exclusive: { price: 2.85, moq: 5000 },
        estimatedRevenue: 125000,
        estimatedProfit: 73000,
        profitMargin: 58.4,
        paybackDays: 14,
        riskLevel: 'low',
      };

      await sendMessage({
        type: 'log',
        data: {
          stepId: 'step-3',
          message: `Dropshipping: $${pricing.dropshipping.price}/unit (MOQ: ${pricing.dropshipping.moq})`,
        },
        timestamp: new Date().toISOString(),
      });

      await delay(400);

      await sendMessage({
        type: 'log',
        data: {
          stepId: 'step-3',
          message: `Projected ROI: ${pricing.profitMargin}% profit margin`,
        },
        timestamp: new Date().toISOString(),
      });

      await sendMessage({
        type: 'step',
        data: {
          id: 'step-3',
          status: 'completed',
        },
        timestamp: new Date().toISOString(),
      });

      await delay(300);

      // Step 4: Execution
      await sendMessage({
        type: 'step',
        data: {
          id: 'step-4',
          agent: 'Execution',
          action: 'Generating Opportunity Report',
          status: 'running',
        },
        timestamp: new Date().toISOString(),
      });

      await sendMessage({
        type: 'log',
        data: {
          stepId: 'step-4',
          message: 'Generating opportunity report...',
        },
        timestamp: new Date().toISOString(),
      });

      await delay(500);

      // Send final result
      await sendMessage({
        type: 'result',
        data: {
          productName: analysis.productName,
          category: analysis.category,
          trendScore: analysis.trendScore,
          lifecycle: analysis.lifecycle,
          matchedFactories: factories.slice(0, 3),
          pricingTiers: {
            dropshipping: pricing.dropshipping,
            wholesale: pricing.wholesale,
            exclusive: pricing.exclusive,
          },
          roiPrediction: {
            estimatedRevenue: pricing.estimatedRevenue,
            estimatedProfit: pricing.estimatedProfit,
            profitMargin: pricing.profitMargin,
            paybackDays: pricing.paybackDays,
            riskLevel: pricing.riskLevel,
          },
        },
        timestamp: new Date().toISOString(),
      });

      await sendMessage({
        type: 'step',
        data: {
          id: 'step-4',
          status: 'completed',
        },
        timestamp: new Date().toISOString(),
      });

      await sendMessage({
        type: 'complete',
        data: { message: 'Agent flow completed successfully' },
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      console.error('[Stream Analysis] Error:', error);
      
      await sendMessage({
        type: 'error',
        data: {
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        timestamp: new Date().toISOString(),
      });
    } finally {
      await writer.close();
    }
  })();

  // Return the stream as SSE
  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
