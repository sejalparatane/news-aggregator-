'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CalendarIcon, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

import { newsBaseURL } from '@/lib/constants';

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tag, setTag] = useState('all');
  const [fromDate, setFromDate] = useState(undefined);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNews = async (currentPage = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        'show-fields': 'thumbnail',
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY || '',
        page: currentPage.toString(),
      };
      if (searchQuery) params.q = searchQuery;
      if (tag && tag !== 'all') params.tag = tag;
      if (fromDate) params['from-date'] = format(fromDate, 'yyyy-MM-dd');

      const response = await axios.get(`${newsBaseURL}/search`, { params });

      if (response.data.response.status !== 'ok') {
        throw new Error('API request failed');
      }

      setNews(response.data.response.results);
      setTotalPages(response.data.response.pages);
      setPage(response.data.response.currentPage);
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error('Rate limit exceeded. Please try again later.');
      } else if (err.response?.status === 401) {
        toast.error('Invalid API key. Please check your configuration.');
      } else {
        toast.error('Failed to fetch news. Please try again.');
      }
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchNews(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchNews(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchNews(page - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Guardian News</h1>

      {/* Filters */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search news (e.g., debate)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-gray-300 focus:ring-theme-purple focus:border-theme-purple"
          />
          <Button onClick={handleSearch} className="bg-theme-purple text-white hover:bg-theme-purple/80 transition-colors">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        <Select value={tag} onValueChange={setTag}>
          <SelectTrigger className="border-gray-300 focus:ring-theme-purple focus:border-theme-purple bg-white">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Tags</SelectItem>
            <SelectItem value="politics/politics">Politics</SelectItem>
            <SelectItem value="environment/recycling">Environment/Recycling</SelectItem>
            <SelectItem value="technology/technology">Technology</SelectItem>
            <SelectItem value="business/business">Business</SelectItem>
            <SelectItem value="culture/culture">Culture</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal border-gray-300 focus:ring-theme-purple focus:border-theme-purple"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
              {fromDate ? format(fromDate, 'PPP') : <span className="text-gray-600">Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={fromDate}
              onSelect={setFromDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* News List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-theme-purple" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-600">No news found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card
              key={item.id}
              className="border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {item.webTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                {item.fields?.thumbnail ? (
                  <img
                    src={item.fields.thumbnail}
                    alt={item.webTitle}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-md mb-3">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <p className="text-sm text-gray-600">Section: {item.sectionName}</p>
                <p className="text-sm text-gray-600">
                  Published: {new Date(item.webPublicationDate).toLocaleDateString()}
                </p>
                <a
                  href={`/news/${item.id}`}
                  className="text-theme-purple hover:underline mt-3 inline-block font-medium"
                >
                  Read more
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-theme-purple text-white hover:bg-theme-purple/80 disabled:bg-gray-300 disabled:text-gray-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <span className="text-gray-700">Page {page} of {totalPages}</span>
          <Button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-theme-purple text-white hover:bg-theme-purple/80 disabled:bg-gray-300 disabled:text-gray-600 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}