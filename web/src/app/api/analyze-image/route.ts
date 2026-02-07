/**
 * Image Analysis API Route
 * Handles image upload and product detection using Nova AI Vision
 */

import { NextRequest, NextResponse } from 'next/server';
import { directusRequest } from '@/lib/directus-client';

interface VisionAnalysisResult {
  category: string;
  confidence: number;
  description: string;
  tags: string[];
}

/**
 * POST /api/analyze-image
 * Upload and analyze product image
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to base64 for API
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const mimeType = file.type;

    // Call Nova AI Vision API
    const visionResponse = await fetch(
      `${process.env.NOVA_AI_API_URL}/vision/analyze`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOVA_AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: `data:${mimeType};base64,${base64}`,
          task: 'product_classification',
          return_all_scores: true,
        }),
      }
    );

    if (!visionResponse.ok) {
      throw new Error('Vision API request failed');
    }

    const visionData = await visionResponse.json();

    // Extract analysis results
    const analysisResult: VisionAnalysisResult = {
      category: visionData.classification?.top_class || 'unknown',
      confidence: visionData.classification?.confidence || 0,
      description: visionData.description || '',
      tags: visionData.tags || [],
    };

    // Save analysis to Directus
    const imageAnalysisData = {
      user_id: userId,
      image_filename: file.name,
      image_url: '', // Will be filled after file upload
      detected_category: analysisResult.category,
      confidence_score: analysisResult.confidence,
      similar_products: visionData.similar_products || [],
      matched_factories: visionData.matched_factories || [],
      analysis_result: analysisResult,
      status: 'completed',
    };

    const saveResponse = await directusRequest(
      '/items/image_analyses',
      {
        method: 'POST',
        body: JSON.stringify(imageAnalysisData),
      }
    );

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      record: saveResponse.data,
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
