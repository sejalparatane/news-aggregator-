'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { newsBaseURL } from '@/lib/constants';
import ReportSection from '@/components/ReportSection';

export default function NewsDetailPage() {
  const { nid } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Join nid array to reconstruct full path (e.g., politics/2025/aug/07/reeves-starmer...)
  const articleId = Array.isArray(nid) ? nid.join('/') : nid;

  const fetchArticle = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${newsBaseURL}/${articleId}`, {
        params: {
          'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY || '',
          'show-fields': 'thumbnail,headline,body',
        },
      });

      if (response.data.response.status !== 'ok') {
        throw new Error('API request failed');
      }

      setArticle(response.data.response.content);
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error('Rate limit exceeded. Please try again later.');
      } else if (err.response?.status === 401) {
        toast.error('Invalid API key. Please check your configuration.');
      } else if (err.response?.status === 404) {
        toast.error('Article not found.');
      } else {
        toast.error('Failed to fetch article. Please try again.');
      }
      setError('Failed to fetch article');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-theme-purple" />
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button asChild className="bg-theme-purple text-white hover:bg-theme-purple/80 transition-colors">
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </a>
          </Button>
        </div>
      ) : article ? (
        <>
        <div className='lg:flex'>
          <div className="w-full md:w-1/2 mx-2 md:mx-5">
          <Button asChild className="mb-6 bg-theme-purple text-white hover:bg-theme-purple/80 transition-colors">
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </a>
          </Button>
          <Card className="border-gray-200 shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {article.fields.headline}
              </CardTitle>
              <p className="text-sm text-gray-600">
                Section: {article.sectionName} | Published: {new Date(article.webPublicationDate).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              {article.fields?.thumbnail ? (
                <img
                  src={article.fields.thumbnail}
                  alt={article.fields.headline}
                  className="w-full h-64 object-cover rounded-md mb-4 md:h-80"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md mb-4">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              <div
                className="prose prose-sm md:prose-base max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: article.fields.body }}
              />
            </CardContent>
          </Card>
        </div>
        <div className='w-full md:w-1/2 mx-2 md:mx-5 border-gray-200 shadow-md rounded-lg'>
        <ReportSection newsData={article}/>
        </div>
        </div>
        </>
      ) : (
        <p className="text-center text-gray-600">No article data available.</p>
      )}
    </div>
  );
}