"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { User, Crown, Calendar, LogOut, CreditCard, Check } from "lucide-react"

export default function AccountTab() {
  const { user, logout, checkPremiumAccess, isTrialActive, daysLeftInTrial } = useAuth()

  if (!user) {
    return null
  }

  const hasPremiumAccess = checkPremiumAccess()
  const trialActive = isTrialActive()
  const daysLeft = daysLeftInTrial()

  return (
    <div className="space-y-6">
      {/* Perfil do Usuário */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Status da Conta */}
        <div className="space-y-4">
          {trialActive && !user.isPremium && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Período de Teste</h3>
              </div>
              <p className="text-sm text-green-700">
                Você tem <span className="font-bold">{daysLeft} {daysLeft === 1 ? 'dia' : 'dias'}</span> restantes no seu teste grátis!
              </p>
              <p className="text-xs text-green-600 mt-2">
                Aproveite todas as funcionalidades premium sem custo.
              </p>
            </div>
          )}

          {user.isPremium && (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-amber-800">Plano Premium Ativo</h3>
              </div>
              <p className="text-sm text-amber-700">
                Você tem acesso ilimitado a todas as funcionalidades!
              </p>
              <p className="text-xs text-amber-600 mt-2">
                Próxima cobrança: R$ 3,99 em {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
              </p>
            </div>
          )}

          {!hasPremiumAccess && (
            <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-800">Teste Expirado</h3>
              </div>
              <p className="text-sm text-red-700 mb-3">
                Seu período de teste terminou. Assine o plano premium para continuar aproveitando!
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                <Crown className="w-4 h-4 mr-2" />
                Assinar por R$ 3,99/mês
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Plano Premium */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Plano Premium</h3>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-700">Acesso completo à Bíblia</p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-700">Estatísticas de progresso detalhadas</p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-700">Planos de leitura ilimitados</p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-700">Modo oração sem limites</p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-700">Diário de gratidão completo</p>
          </div>
        </div>

        <div className="text-center p-4 bg-white rounded-lg border border-blue-200 mb-4">
          <p className="text-3xl font-bold text-blue-600 mb-1">R$ 3,99</p>
          <p className="text-sm text-gray-600">por mês</p>
        </div>

        {!user.isPremium && (
          <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
            <Crown className="w-4 h-4 mr-2" />
            {trialActive ? "Ativar Premium Agora" : "Assinar Premium"}
          </Button>
        )}
      </Card>

      {/* Botão de Sair */}
      <Button
        onClick={logout}
        variant="outline"
        className="w-full border-red-200 text-red-600 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair da Conta
      </Button>
    </div>
  )
}
