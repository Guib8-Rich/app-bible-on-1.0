"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Heart, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  Play,
  Check,
  Star,
  Flame,
  Cross,
  Clock,
  ChevronRight,
  Book,
  User,
  Lock,
  Crown
} from "lucide-react"
import BibleReader from "@/components/bible-reader"
import AuthModal from "@/components/auth-modal"
import AccountTab from "@/components/account-tab"
import { useAuth } from "@/lib/auth-context"

// Dados de exemplo
const dailyVerse = {
  reference: "Filipenses 4:13",
  text: "Tudo posso naquele que me fortalece.",
  reflection: "Ainda que tudo pareça perdido, Deus está preparando algo maior. Confie no tempo Dele e permaneça firme na fé."
}

const weeklyChallenge = {
  week: "Semana 1",
  challenge: "Ore por alguém que te magoou",
  description: "Escolha uma pessoa e dedique 5 minutos de oração sincera por ela hoje.",
  completed: false
}

// Planos de leitura disponíveis (biblioteca)
const availableReadingPlans = [
  { id: 1, title: "Fortaleça sua fé em 21 dias", days: 21, description: "Versículos diários para fortalecer sua confiança em Deus" },
  { id: 2, title: "Sabedoria de Provérbios", days: 31, description: "Um capítulo de Provérbios por dia durante um mês" },
  { id: 3, title: "Salmos de Conforto", days: 14, description: "Encontre paz e consolo nos Salmos" },
  { id: 4, title: "Evangelho de João", days: 21, description: "Conheça Jesus através do Evangelho de João" },
  { id: 5, title: "Cartas de Paulo", days: 30, description: "Explore os ensinamentos do apóstolo Paulo" },
  { id: 6, title: "Histórias do Antigo Testamento", days: 40, description: "Grandes histórias de fé do Antigo Testamento" },
  { id: 7, title: "Amor e Relacionamentos", days: 14, description: "O que a Bíblia ensina sobre amor e relacionamentos" }
]

// 5 curiosidades que mudam todo dia
const bibleFacts = [
  "O Salmo 91 era recitado por guerreiros antes de ir à batalha.",
  "A Bíblia foi escrita ao longo de aproximadamente 1.500 anos por mais de 40 autores diferentes.",
  "O versículo mais curto da Bíblia é 'Jesus chorou' (João 11:35).",
  "O livro de Salmos é o maior livro da Bíblia com 150 capítulos.",
  "A Bíblia foi o primeiro livro impresso na história, por Johannes Gutenberg em 1455."
]

// Tipos para histórico de orações
type PrayerSession = {
  date: string
  duration: number // em segundos
}

type PrayerStats = {
  total: number
  sessions: number
  average: number
}

type ReadingPlan = {
  id: number
  title: string
  days: number
  progress: number
  startDate: string
  currentDay: number
}

export default function Home() {
  const { user, isAuthenticated, setShowAuthModal, checkPremiumAccess } = useAuth()
  const [currentTab, setCurrentTab] = useState("home")
  const [gratitudeEntries, setGratitudeEntries] = useState<string[]>([])
  const [newGratitude, setNewGratitude] = useState("")
  const [prayerMode, setPrayerMode] = useState(false)
  const [prayerTime, setPrayerTime] = useState(0)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  
  // Sistema de contabilização de orações
  const [prayerHistory, setPrayerHistory] = useState<PrayerSession[]>([])
  const [progressFilter, setProgressFilter] = useState<"day" | "week" | "month" | "year">("week")

  // Sistema de planos de leitura
  const [userReadingPlans, setUserReadingPlans] = useState<ReadingPlan[]>([])

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("prayerHistory")
    if (saved) {
      setPrayerHistory(JSON.parse(saved))
    }

    // Carregar planos de leitura
    const savedPlans = localStorage.getItem("userReadingPlans")
    if (savedPlans) {
      setUserReadingPlans(JSON.parse(savedPlans))
    }
  }, [])

  // Sistema de adicionar novo plano a cada dia
  useEffect(() => {
    const today = new Date().toDateString()
    const lastPlanDate = localStorage.getItem("lastPlanAddDate")
    
    if (lastPlanDate !== today && userReadingPlans.length < availableReadingPlans.length) {
      // Novo dia, adiciona um novo plano disponível
      const usedPlanIds = userReadingPlans.map(p => p.id)
      const nextPlan = availableReadingPlans.find(p => !usedPlanIds.includes(p.id))
      
      if (nextPlan) {
        const newPlan: ReadingPlan = {
          id: nextPlan.id,
          title: nextPlan.title,
          days: nextPlan.days,
          progress: 0,
          startDate: today,
          currentDay: 0
        }
        const updatedPlans = [...userReadingPlans, newPlan]
        setUserReadingPlans(updatedPlans)
        localStorage.setItem("userReadingPlans", JSON.stringify(updatedPlans))
        localStorage.setItem("lastPlanAddDate", today)
      }
    }
  }, [userReadingPlans])

  // Mudar curiosidade diariamente
  useEffect(() => {
    const today = new Date().toDateString()
    const savedDate = localStorage.getItem("lastFactDate")
    const savedIndex = localStorage.getItem("currentFactIndex")
    
    if (savedDate !== today) {
      // Novo dia, muda a curiosidade
      const newIndex = Math.floor(Math.random() * bibleFacts.length)
      setCurrentFactIndex(newIndex)
      localStorage.setItem("lastFactDate", today)
      localStorage.setItem("currentFactIndex", newIndex.toString())
    } else if (savedIndex) {
      setCurrentFactIndex(parseInt(savedIndex))
    }
  }, [])

  // Timer para modo oração
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (prayerMode) {
      interval = setInterval(() => {
        setPrayerTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [prayerMode])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    action()
  }

  const addGratitude = () => {
    requireAuth(() => {
      if (newGratitude.trim() && gratitudeEntries.length < 3) {
        setGratitudeEntries([...gratitudeEntries, newGratitude])
        setNewGratitude("")
      }
    })
  }

  const finalizePrayer = () => {
    if (prayerTime > 0) {
      const newSession: PrayerSession = {
        date: new Date().toISOString(),
        duration: prayerTime
      }
      const updatedHistory = [...prayerHistory, newSession]
      setPrayerHistory(updatedHistory)
      localStorage.setItem("prayerHistory", JSON.stringify(updatedHistory))
    }
    setPrayerMode(false)
    setPrayerTime(0)
  }

  const continueReadingPlan = (planId: number) => {
    requireAuth(() => {
      const updatedPlans = userReadingPlans.map(plan => {
        if (plan.id === planId && plan.currentDay < plan.days) {
          const newDay = plan.currentDay + 1
          const newProgress = (newDay / plan.days) * 100
          return { ...plan, currentDay: newDay, progress: newProgress }
        }
        return plan
      })
      setUserReadingPlans(updatedPlans)
      localStorage.setItem("userReadingPlans", JSON.stringify(updatedPlans))
    })
  }

  // Calcular estatísticas baseadas no filtro
  const getPrayerStats = (): PrayerStats => {
    const now = new Date()
    let filtered: PrayerSession[] = []

    switch (progressFilter) {
      case "day":
        filtered = prayerHistory.filter(session => {
          const sessionDate = new Date(session.date)
          return sessionDate.toDateString() === now.toDateString()
        })
        break
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        filtered = prayerHistory.filter(session => new Date(session.date) >= weekAgo)
        break
      case "month":
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        filtered = prayerHistory.filter(session => new Date(session.date) >= monthAgo)
        break
      case "year":
        const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        filtered = prayerHistory.filter(session => new Date(session.date) >= yearAgo)
        break
    }

    const total = filtered.reduce((sum, session) => sum + session.duration, 0)
    const sessions = filtered.length
    const average = sessions > 0 ? Math.floor(total / sessions) : 0

    return { total, sessions, average }
  }

  const stats = getPrayerStats()
  const hasPremiumAccess = checkPremiumAccess()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <AuthModal />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/67b1be65-767f-4f3c-9b3b-5362fdc0cd6c.png" 
                alt="Bíblia On" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Bíblia On
                </h1>
                <p className="text-xs text-gray-500">Sua jornada diária com Deus</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="home" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Início</span>
            </TabsTrigger>
            <TabsTrigger value="bible" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Book className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Bíblia</span>
              <span className="hidden sm:inline text-xs ml-1">(Em Breve)</span>
            </TabsTrigger>
            <TabsTrigger value="reading" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Leitura</span>
            </TabsTrigger>
            <TabsTrigger value="gratitude" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Sparkles className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Gratidão</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Progresso</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Conta</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Reflexão do Dia */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Reflexão do Dia</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {dailyVerse.reference}
                  </Badge>
                  <p className="text-2xl font-serif text-gray-800 leading-relaxed mb-4">
                    "{dailyVerse.text}"
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {dailyVerse.reflection}
                  </p>
                </div>
              </div>
            </Card>

            {/* Desafio da Semana */}
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">Desafio Espiritual</h2>
                  <p className="text-xs text-gray-600">{weeklyChallenge.week}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {weeklyChallenge.challenge}
                  </h3>
                  <p className="text-gray-600">
                    {weeklyChallenge.description}
                  </p>
                </div>

                <Button 
                  onClick={() => requireAuth(() => setChallengeCompleted(!challengeCompleted))}
                  className={`w-full ${challengeCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'} text-white`}
                >
                  {challengeCompleted ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Desafio Concluído!
                    </>
                  ) : (
                    <>
                      Marcar como Concluído
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Modo Oração */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Cross className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Modo Oração</h2>
              </div>

              {!prayerMode ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Reserve um momento especial para se conectar com Deus. O modo oração silencia notificações e cria um ambiente tranquilo.
                  </p>
                  <Button 
                    onClick={() => requireAuth(() => {
                      setPrayerMode(true)
                      setPrayerTime(0)
                    })}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Momento de Oração
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="py-8">
                    <Clock className="w-16 h-16 mx-auto text-blue-400 mb-4 animate-pulse" />
                    <p className="text-4xl font-bold text-blue-600 mb-2">
                      {formatTime(prayerTime)}
                    </p>
                    <p className="text-gray-600 italic">
                      "Momento com Deus — respire e ore"
                    </p>
                  </div>
                  <Button 
                    onClick={finalizePrayer}
                    variant="outline"
                    className="w-full border-blue-200 hover:bg-blue-50"
                  >
                    Finalizar Oração
                  </Button>
                </div>
              )}
            </Card>

            {/* Curiosidade Bíblica */}
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Você Sabia?</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {bibleFacts[currentFactIndex]}
              </p>

              <Button 
                onClick={() => setCurrentFactIndex((currentFactIndex + 1) % bibleFacts.length)}
                variant="outline"
                className="w-full border-teal-200 hover:bg-teal-50"
              >
                Próxima Curiosidade
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </TabsContent>

          {/* Bible Tab - Com blur e mensagem */}
          <TabsContent value="bible">
            <div className="relative">
              {/* Conteúdo com blur */}
              <div className="filter blur-md pointer-events-none">
                <BibleReader />
              </div>

              {/* Caixa de mensagem */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <Card className="p-8 bg-white shadow-2xl max-w-md mx-auto text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Book className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Novidades a caminho!
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    A Bíblia completa será liberada em breve com recursos exclusivos para facilitar sua leitura.
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reading Tab */}
          <TabsContent value="reading" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Planos de Leitura</h2>
              <p className="text-gray-600">Escolha um plano e fortaleça sua fé diariamente</p>
              <p className="text-sm text-blue-600 mt-2">✨ Um novo plano é adicionado a cada dia!</p>
            </div>

            {userReadingPlans.length === 0 ? (
              <Card className="p-8 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg text-center">
                <BookOpen className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Nenhum plano iniciado ainda
                </h3>
                <p className="text-gray-600 mb-4">
                  Volte amanhã para começar seu primeiro plano de leitura!
                </p>
                <p className="text-sm text-blue-600">
                  Um novo plano será adicionado automaticamente a cada dia
                </p>
              </Card>
            ) : (
              userReadingPlans.map((plan) => (
                <Card key={plan.id} className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {plan.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {plan.days} dias • {Math.round(plan.progress)}% concluído
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">
                        Dia {plan.currentDay}/{plan.days}
                      </Badge>
                    </div>

                    <Progress value={plan.progress} className="h-2" />

                    <Button 
                      onClick={() => continueReadingPlan(plan.id)}
                      disabled={plan.currentDay >= plan.days}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white disabled:opacity-50"
                    >
                      {plan.currentDay >= plan.days ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Plano Concluído!
                        </>
                      ) : (
                        <>
                          Continuar Leitura
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Gratitude Tab */}
          <TabsContent value="gratitude" className="space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Diário de Gratidão</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Liste 3 coisas boas que aconteceram hoje. Cultivar gratidão transforma o coração.
              </p>

              <div className="space-y-4">
                {gratitudeEntries.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 flex-1">{entry}</p>
                  </div>
                ))}

                {gratitudeEntries.length < 3 && (
                  <div className="space-y-3">
                    <Separator />
                    <textarea
                      value={newGratitude}
                      onChange={(e) => setNewGratitude(e.target.value)}
                      placeholder={`Gratidão ${gratitudeEntries.length + 1} de 3...`}
                      className="w-full p-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white"
                      rows={3}
                    />
                    <Button 
                      onClick={addGratitude}
                      disabled={!newGratitude.trim()}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white disabled:opacity-50"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Adicionar Gratidão
                    </Button>
                  </div>
                )}

                {gratitudeEntries.length === 3 && (
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <Check className="w-12 h-12 mx-auto text-green-500 mb-2" />
                    <p className="text-green-700 font-semibold">
                      Parabéns! Você completou seu diário de hoje! 🙏
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Calendar Tab - Com bloqueio premium */}
          <TabsContent value="calendar" className="space-y-6">
            {!hasPremiumAccess ? (
              <div className="relative">
                {/* Conteúdo com blur */}
                <div className="filter blur-sm pointer-events-none">
                  <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-800">Seu Progresso Espiritual</h2>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg"></div>
                  </Card>
                </div>

                {/* CTA Premium */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Card className="p-8 bg-white shadow-2xl max-w-md mx-4 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      Acompanhe seu Crescimento
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Você pode acompanhar seu crescimento espiritual ativando seu plano ilimitado
                    </p>
                    <Button 
                      onClick={() => setCurrentTab("account")}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Ativar Acesso Irrestrito
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">
                      Apenas R$ 3,99/mês
                    </p>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Seu Progresso Espiritual</h2>
                </div>

                {/* Filtro de Período */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  <Button
                    variant={progressFilter === "day" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProgressFilter("day")}
                    className={progressFilter === "day" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "border-blue-200"}
                  >
                    Hoje
                  </Button>
                  <Button
                    variant={progressFilter === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProgressFilter("week")}
                    className={progressFilter === "week" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "border-blue-200"}
                  >
                    Semana
                  </Button>
                  <Button
                    variant={progressFilter === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProgressFilter("month")}
                    className={progressFilter === "month" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "border-blue-200"}
                  >
                    Mês
                  </Button>
                  <Button
                    variant={progressFilter === "year" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProgressFilter("year")}
                    className={progressFilter === "year" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "border-blue-200"}
                  >
                    Ano
                  </Button>
                </div>

                {/* Estatísticas de Oração */}
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Cross className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Tempo de Oração</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{formatDuration(stats.total)}</p>
                      <p className="text-xs text-gray-600">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-cyan-600">{stats.sessions}</p>
                      <p className="text-xs text-gray-600">Sessões</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-teal-600">{formatDuration(stats.average)}</p>
                      <p className="text-xs text-gray-600">Média</p>
                    </div>
                  </div>
                </Card>

                {/* Estatísticas Gerais */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Leituras</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{userReadingPlans.reduce((sum, p) => sum + p.currentDay, 0)}</p>
                    <p className="text-xs text-gray-500">Total de dias</p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-amber-600" />
                      <span className="text-sm text-gray-600">Desafios</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600">3</p>
                    <p className="text-xs text-gray-500">Concluídos</p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-teal-600" />
                      <span className="text-sm text-gray-600">Gratidão</span>
                    </div>
                    <p className="text-2xl font-bold text-teal-600">15</p>
                    <p className="text-xs text-gray-500">Dias ativos</p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Cross className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Orações</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{prayerHistory.length}</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Sequência */}
                <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                  <Flame className="w-12 h-12 mx-auto text-orange-500 mb-2" />
                  <p className="text-3xl font-bold text-orange-600 mb-1">7 dias</p>
                  <p className="text-gray-600">Sequência atual de atividades</p>
                  <p className="text-sm text-gray-500 mt-2">Continue assim! Você está no caminho certo 🙏</p>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            {!isAuthenticated ? (
              <Card className="p-8 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo!</h2>
                <p className="text-gray-600 mb-6">
                  Crie sua conta para acessar todas as funcionalidades e acompanhar seu progresso espiritual
                </p>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                >
                  Criar Conta ou Entrar
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  🎉 3 dias grátis para testar!
                </p>
              </Card>
            ) : (
              <AccountTab />
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-blue-100 py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-600">
            "Confie no Senhor de todo o seu coração" - Provérbios 3:5
          </p>
        </div>
      </footer>
    </div>
  )
}
