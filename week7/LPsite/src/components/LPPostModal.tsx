import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLp, type LpCreationData } from '../api/lps';

interface LPPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LPPostModal: React.FC<LPPostModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState<string>('');

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<unknown, Error, LpCreationData>({
    mutationFn: createLp,
    onSuccess: () => {
      // Invalidate and refetch the 'lps' query to show the new post
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      onClose(); // Close the modal on success
    },
  });

  // Clear form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setContent('');
      setTags([]);
      setNewTagInput('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    const trimmedTag = newTagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = () => {
    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    mutate({ title, content, tags });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">새 LP 게시글 작성</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="LP 제목"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
            placeholder="LP에 대한 설명을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tag-input" className="block text-gray-700 text-sm font-bold mb-2">
            태그 추가
          </label>
          <div className="flex">
            <input
              type="text"
              id="tag-input"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="태그를 입력하고 Enter"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleAddTag}
            >
              추가
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2 min-h-[2.5rem]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
            >
              {tag}
              <button
                className="ml-2 text-gray-500 hover:text-gray-800"
                onClick={() => handleRemoveTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        {isError && (
          <p className="text-red-500 text-sm mb-4">
            오류가 발생했습니다: {error.message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? '등록 중...' : '게시글 등록'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LPPostModal;
