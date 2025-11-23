"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  BookOpen, 
  Search, 
  ChevronLeft,
  ChevronRight,
  Loader2,
  BookMarked,
  AlertCircle
} from "lucide-react"
import { bibleBooks, fetchBibleChapter, searchBibleVerses, type BibleVerse } from "@/lib/bible-data"

export default function BibleReader() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<number>(1)
  const [verses, setVerses] = useState<BibleVerse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<BibleVerse[]>([])
  const [searching, setSearching] = useState(false)
  const [viewMode, setViewMode] = useState<'browse' | 'search'>('browse')
  const [testament, setTestament] = useState<'all' | 'old' | 'new'>('all')

  const currentBook = selectedBook ? bibleBooks.find(b => b.id === selectedBook) : null

  // Carregar capítulo
  const loadChapter = async (bookAbbrev: string, chapter: number) => {
    setLoading(true)
    setError(null)
    setViewMode('browse')
    try {
      const data = await fetchBibleChapter(bookAbbrev, chapter)
      if (data.length === 0) {
        setError('Este capítulo está temporariamente indisponível. Tente outro capítulo ou livro.')
      }
      setVerses(data)
    } catch (err: any) {
      setError('Não foi possível carregar o capítulo. Tente outro capítulo ou livro.')
      setVerses([])
    } finally {
      setLoading(false)
    }
  }

  // Buscar versículos
  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setSearching(true)
    setError(null)
    setViewMode('search')
    try {
      const results = await searchBibleVerses(searchQuery)
      setSearchResults(results)
      if (results.length === 0) {
        setError('Nenhum versículo encontrado para esta busca.')
      }
    } catch (err: any) {
      setError('Não foi possível realizar a busca. Tente novamente.')
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  // Navegar entre capítulos
  const goToPreviousChapter = () => {
    if (currentBook && selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1)
      loadChapter(currentBook.abbrev, selectedChapter - 1)
    }
  }

  const goToNextChapter = () => {
    if (currentBook && selectedChapter < currentBook.chapters) {
      setSelectedChapter(selectedChapter + 1)
      loadChapter(currentBook.abbrev, selectedChapter + 1)
    }
  }

  // Filtrar livros por testamento
  const filteredBooks = bibleBooks.filter(book => {
    if (testament === 'all') return true
    return book.testament === testament
  })

  return (
    <div className="space-y-6">
      {/* Header com busca */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Bíblia Sagrada</h2>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Buscar versículos... (ex: amor, fé, esperança)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch}
            disabled={searching || !searchQuery.trim()}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            {searching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>
      </Card>

      {/* Mensagem de erro */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Seleção de livro */}
      {!selectedBook && viewMode === 'browse' && (
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Escolha um Livro</h3>
            
            <div className="flex gap-2 mb-4 flex-wrap">
              <Button
                variant={testament === 'all' ? 'default' : 'outline'}
                onClick={() => setTestament('all')}
                className={testament === 'all' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : ''}
              >
                Todos
              </Button>
              <Button
                variant={testament === 'old' ? 'default' : 'outline'}
                onClick={() => setTestament('old')}
                className={testament === 'old' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : ''}
              >
                Antigo Testamento
              </Button>
              <Button
                variant={testament === 'new' ? 'default' : 'outline'}
                onClick={() => setTestament('new')}
                className={testament === 'new' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : ''}
              >
                Novo Testamento
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredBooks.map((book) => (
                <Button
                  key={book.id}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  onClick={() => {
                    setSelectedBook(book.id)
                    setSelectedChapter(1)
                    setError(null)
                    loadChapter(book.abbrev, 1)
                  }}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded flex items-center justify-center flex-shrink-0">
                      <BookMarked className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-800">{book.name}</p>
                      <p className="text-xs text-gray-500">{book.chapters} capítulos</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {book.abbrev}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}

      {/* Leitura do capítulo */}
      {selectedBook && currentBook && viewMode === 'browse' && (
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
          {/* Header do capítulo */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentBook.name} {selectedChapter}
              </h3>
              <p className="text-sm text-gray-600">
                {currentBook.chapters} capítulos • {currentBook.testament === 'old' ? 'Antigo' : 'Novo'} Testamento
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedBook(null)
                setVerses([])
                setError(null)
              }}
              className="border-blue-200 hover:bg-blue-50"
            >
              Voltar
            </Button>
          </div>

          {/* Seletor de capítulos */}
          <ScrollArea className="w-full">
            <div className="flex items-center gap-2 mb-6 pb-2">
              {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map((chapter) => (
                <Button
                  key={chapter}
                  variant={chapter === selectedChapter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setSelectedChapter(chapter)
                    setError(null)
                    loadChapter(currentBook.abbrev, chapter)
                  }}
                  className={chapter === selectedChapter ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : ''}
                >
                  {chapter}
                </Button>
              ))}
            </div>
          </ScrollArea>

          <Separator className="mb-6" />

          {/* Versículos */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : verses.length > 0 ? (
            <>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {verses.map((verse) => (
                    <div key={verse.verse} className="flex gap-3">
                      <Badge 
                        variant="secondary" 
                        className="h-6 bg-blue-100 text-blue-700 flex-shrink-0"
                      >
                        {verse.verse}
                      </Badge>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {verse.text}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Navegação entre capítulos */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-blue-100">
                <Button
                  variant="outline"
                  onClick={goToPreviousChapter}
                  disabled={selectedChapter === 1}
                  className="border-blue-200 hover:bg-blue-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Capítulo Anterior
                </Button>
                <Button
                  variant="outline"
                  onClick={goToNextChapter}
                  disabled={selectedChapter === currentBook.chapters}
                  className="border-blue-200 hover:bg-blue-50"
                >
                  Próximo Capítulo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          ) : null}
        </Card>
      )}

      {/* Resultados da busca */}
      {viewMode === 'search' && (
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Resultados da Busca
              </h3>
              <p className="text-sm text-gray-600">
                {searchResults.length} versículos encontrados para "{searchQuery}"
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setViewMode('browse')
                setSearchResults([])
                setSearchQuery("")
                setError(null)
              }}
              className="border-blue-200 hover:bg-blue-50"
            >
              Voltar
            </Button>
          </div>

          <Separator className="mb-6" />

          <ScrollArea className="h-[500px] pr-4">
            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">Nenhum versículo encontrado</p>
                <p className="text-sm text-gray-500 mt-1">Tente buscar por outras palavras</p>
              </div>
            ) : (
              <div className="space-y-6">
                {searchResults.map((verse, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-600 text-white">
                        {verse.book} {verse.chapter}:{verse.verse}
                      </Badge>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {verse.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>
      )}
    </div>
  )
}
