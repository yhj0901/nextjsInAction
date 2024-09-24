'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Copy, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Phrase {
  id: string;
  content: string;
  tags: string[];
}

export default function EnhancedPhraseKeeper() {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [newPhrase, setNewPhrase] = useState('');
  const [newTags, setNewTags] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedPhrases = localStorage.getItem('savedPhrases');
    if (savedPhrases) {
      setPhrases(JSON.parse(savedPhrases));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedPhrases', JSON.stringify(phrases));
  }, [phrases]);

  const addPhrase = () => {
    if (newPhrase.trim()) {
      const tags = newTags.split(' ').filter((tag) => tag.startsWith('#'));
      const newId = Math.random().toString(36).substr(2, 9);
      setPhrases([...phrases, { id: newId, content: newPhrase.trim(), tags }]);
      setNewPhrase('');
      setNewTags('');
      toast.success('문구가 추가되었습니다.');
    }
  };

  const deletePhrase = (id: string) => {
    const updatedPhrases = phrases.filter((phrase) => phrase.id !== id);
    setPhrases(updatedPhrases);
    toast.info('문구가 삭제되었습니다.');
  };

  const copyPhrase = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('문구가 클립보드에 복사되었습니다.');
  };

  const filteredPhrases = phrases.filter(
    (phrase) =>
      phrase.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phrase.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <ToastContainer position="bottom-right" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">문구 저장소</h1>

        <div className="space-y-4 mb-6">
          <Textarea
            value={newPhrase}
            onChange={(e) => setNewPhrase(e.target.value)}
            placeholder="새 문구 입력 (여러 줄 가능)"
            rows={4}
          />
          <Input
            type="text"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
            placeholder="해시태그 입력 (예: #회비 #9월)"
          />
          <Button onClick={addPhrase} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> 추가
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="문구 또는 해시태그로 검색"
              className="pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          {filteredPhrases.map((phrase) => (
            <Card key={phrase.id}>
              <CardContent className="p-4">
                <pre className="whitespace-pre-wrap mb-2">{phrase.content}</pre>
                <div className="flex flex-wrap gap-2 mb-2">
                  {phrase.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyPhrase(phrase.content)}
                  >
                    <Copy className="h-4 w-4 mr-2" /> 복사
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deletePhrase(phrase.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> 삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
