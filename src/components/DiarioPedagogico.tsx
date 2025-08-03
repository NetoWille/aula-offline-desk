import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, BookOpen, FileText, ArrowLeft } from 'lucide-react';

// Dados das aulas
const dadosDasAulas = {
  "9": {
    "2025-08-06": {
      titulo: "Vértice da Parábola",
      conteudo: [
        { 
          tipo: 'titulo', 
          texto: '🎯 O Ponto Mais Importante da Parábola: O Vértice!' 
        },
        { 
          tipo: 'conceito', 
          texto: 'O vértice é o ponto onde a parábola "vira". É o ponto mais alto (se a parábola abre para baixo) ou mais baixo (se abre para cima).' 
        },
        { 
          tipo: 'conceito', 
          texto: '📊 Interpretação Importante:\n• Se a > 0 (concavidade ∪), o vértice é o PONTO DE MÍNIMO\n• Se a < 0 (concavidade ∩), o vértice é o PONTO DE MÁXIMO' 
        },
        { 
          tipo: 'formula', 
          texto: 'Fórmulas do Vértice:\n\nXᵥ = -b/(2a)  |  Yᵥ = -Δ/(4a)\n\nOnde Δ = b² - 4ac' 
        },
        { 
          tipo: 'conceito', 
          texto: '💡 Dica Prática: O X do vértice sempre está no "meio" entre as raízes da função!' 
        }
      ],
      notasProfessor: `🎯 Estratégia da Aula:
      • Comece retomando o gráfico da função anterior
      • Destaque visualmente onde fica o vértice
      • Mostre que o vértice é o "ponto de virada"

      ⚠️ Pontos de Atenção:
      • Muitos alunos confundem o sinal na fórmula Xᵥ = -b/(2a)
      • Reforce que quando a > 0, o vértice é mínimo
      • Use exemplos visuais sempre que possível

      💡 Dica Extra:
      Relacione com situações do cotidiano: altura máxima de uma bola, lucro máximo de uma empresa, etc.`
    },
    "2025-08-13": {
      titulo: "Gráfico da Função Quadrática",
      conteudo: [
        { 
          tipo: 'titulo', 
          texto: '📈 Construindo o Gráfico da Parábola' 
        },
        { 
          tipo: 'conceito', 
          texto: 'Para construir o gráfico de uma função quadrática, precisamos de alguns pontos importantes:\n• Vértice\n• Raízes (se existirem)\n• Ponto de intersecção com o eixo Y' 
        }
      ],
      notasProfessor: 'Usar papel quadriculado e régua para maior precisão nos gráficos.'
    }
  },
  "7": {
    "2025-08-07": {
      titulo: "Equações do 1º Grau",
      conteudo: [
        { 
          tipo: 'titulo', 
          texto: '⚖️ Resolvendo Equações do 1º Grau' 
        },
        { 
          tipo: 'conceito', 
          texto: 'Uma equação do 1º grau tem a forma: ax + b = 0, onde a ≠ 0' 
        }
      ],
      notasProfessor: 'Usar a analogia da balança para explicar o conceito de igualdade.'
    }
  },
  "6": {
    "2025-08-05": {
      titulo: "Frações Equivalentes",
      conteudo: [
        { 
          tipo: 'titulo', 
          texto: '🍕 Descobrindo Frações Equivalentes' 
        },
        { 
          tipo: 'conceito', 
          texto: 'Frações equivalentes representam a mesma quantidade, mas são escritas de formas diferentes.' 
        }
      ],
      notasProfessor: 'Usar pizzas e chocolates como exemplos visuais.'
    }
  }
};

const nomesMeses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const DiarioPedagogico = () => {
  const [telaAtual, setTelaAtual] = useState('turmas');
  const [turmaAtual, setTurmaAtual] = useState('');
  const [mesAtual, setMesAtual] = useState(8); // Agosto
  const [anoAtual, setAnoAtual] = useState(2025);
  const [aulaAtual, setAulaAtual] = useState(null);
  const [notasVisiveis, setNotasVisiveis] = useState(false);

  const mostrarCalendario = (turma: string) => {
    setTurmaAtual(turma);
    setTelaAtual('calendario');
  };

  const carregarAula = (data: string) => {
    const aula = dadosDasAulas[turmaAtual]?.[data];
    if (!aula) return;
    
    setAulaAtual({ ...aula, data });
    setNotasVisiveis(false);
    setTelaAtual('aula');
  };

  const renderizarCalendario = () => {
    const primeiroDia = new Date(anoAtual, mesAtual - 1, 1).getDay();
    const diasNoMes = new Date(anoAtual, mesAtual, 0).getDate();
    
    const dias = [];
    
    // Células vazias no início
    for (let i = 0; i < primeiroDia; i++) {
      dias.push(<div key={`empty-${i}`} className="p-2 md:p-3"></div>);
    }
    
    // Dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataFormatada = `${anoAtual}-${String(mesAtual).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      const temAula = dadosDasAulas[turmaAtual]?.[dataFormatada];
      
      dias.push(
        <div
          key={dia}
          className={`p-2 md:p-3 text-center rounded-lg cursor-pointer transition-all text-sm md:text-base ${
            temAula 
              ? 'bg-educational-primary text-educational-card font-bold hover:bg-educational-primary-light active:scale-95' 
              : 'hover:bg-educational-accent-soft'
          }`}
          onClick={() => temAula && carregarAula(dataFormatada)}
        >
          {dia}
        </div>
      );
    }
    
    return dias;
  };

  const mudarMes = (direcao: number) => {
    let novoMes = mesAtual + direcao;
    let novoAno = anoAtual;
    
    if (novoMes > 12) {
      novoMes = 1;
      novoAno++;
    } else if (novoMes < 1) {
      novoMes = 12;
      novoAno--;
    }
    
    setMesAtual(novoMes);
    setAnoAtual(novoAno);
  };

  const renderSlide = (slide: any, index: number) => {
    const baseClasses = "p-4 md:p-6 rounded-lg border-l-4";
    
    switch (slide.tipo) {
      case 'titulo':
        return (
          <div key={index} className={`${baseClasses} border-educational-primary bg-educational-accent-soft text-center`}>
            <h3 className="text-xl md:text-2xl font-bold text-educational-primary">{slide.texto}</h3>
          </div>
        );
      case 'conceito':
        return (
          <div key={index} className={`${baseClasses} border-educational-primary-light bg-educational-card shadow-sm`}>
            <div className="text-base md:text-lg leading-relaxed whitespace-pre-line text-foreground">
              {slide.texto}
            </div>
          </div>
        );
      case 'formula':
        return (
          <div key={index} className={`${baseClasses} border-educational-warning bg-educational-warning/10 text-center`}>
            <div className="text-lg md:text-xl font-mono bg-educational-card p-3 md:p-4 rounded border-2 border-educational-warning/50 shadow-sm">
              <div className="whitespace-pre-line text-educational-primary font-semibold">{slide.texto}</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Tela de Turmas
  if (telaAtual === 'turmas') {
    return (
      <div className="min-h-screen bg-educational-bg px-4 py-6 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8 pb-4 md:pb-6 border-b-2 border-educational-primary/30">
            <h1 className="text-3xl md:text-4xl font-bold text-educational-primary mb-2 md:mb-4">
              📚 Diário de Aulas Digital
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground px-2">
              Selecione uma turma para acessar o calendário de aulas
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
            {[
              { ano: '6', nome: 'Matemática Fundamental', emoji: '🔢' },
              { ano: '7', nome: 'Álgebra Básica', emoji: '📐' },
              { ano: '9', nome: 'Função Quadrática', emoji: '📊' }
            ].map((turma) => (
              <Card 
                key={turma.ano}
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-educational-accent to-educational-accent-soft border-0 active:scale-95"
                onClick={() => mostrarCalendario(turma.ano)}
              >
                <CardHeader className="text-center pb-3">
                  <div className="text-4xl md:text-5xl mb-2">{turma.emoji}</div>
                  <CardTitle className="text-xl md:text-2xl text-educational-primary">
                    {turma.ano}º Ano
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm md:text-base text-educational-primary/80 font-medium">
                    {turma.nome}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tela do Calendário
  if (telaAtual === 'calendario') {
    return (
      <div className="min-h-screen bg-educational-bg px-4 py-6 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 md:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <Button 
                variant="outline" 
                onClick={() => setTelaAtual('turmas')}
                className="flex items-center gap-2 text-sm md:text-base bg-educational-card border-educational-primary/30 hover:bg-educational-accent-soft"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar às Turmas
              </Button>
              <h2 className="text-xl md:text-3xl font-bold text-educational-primary">
                Calendário - {turmaAtual}º Ano
              </h2>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => mudarMes(-1)}
                className="bg-educational-card border-educational-primary/30 hover:bg-educational-accent-soft"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-base md:text-xl font-semibold text-center flex-1 sm:min-w-[140px] md:min-w-[200px] text-educational-primary">
                {nomesMeses[mesAtual - 1]} {anoAtual}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => mudarMes(1)}
                className="bg-educational-card border-educational-primary/30 hover:bg-educational-accent-soft"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Card className="bg-educational-card border-educational-primary/20 shadow-lg">
            <CardContent className="p-3 md:p-6">
              <div className="grid grid-cols-7 gap-1 md:gap-2 mb-3 md:mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                  <div 
                    key={dia} 
                    className="p-2 md:p-3 text-center font-bold text-educational-primary bg-educational-accent-soft rounded text-xs md:text-base"
                  >
                    {dia}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {renderizarCalendario()}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 md:mt-6 text-center text-muted-foreground">
            <p className="flex items-center justify-center gap-2 text-sm md:text-base">
              <Calendar className="w-4 h-4" />
              <strong>Dica:</strong> Clique nos dias destacados para acessar o conteúdo da aula
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tela da Aula
  if (telaAtual === 'aula' && aulaAtual) {
    const dataFormatada = new Date(aulaAtual.data + 'T00:00:00').toLocaleDateString('pt-BR');
    
    return (
      <div className="min-h-screen bg-educational-bg px-4 py-6 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => setTelaAtual('calendario')}
            className="mb-4 md:mb-6 flex items-center gap-2 text-sm md:text-base bg-educational-card border-educational-primary/30 hover:bg-educational-accent-soft"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Calendário
          </Button>
          
          <Card className="mb-6 border-educational-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-educational-primary to-educational-primary-light text-educational-card rounded-t-lg p-4 md:p-6">
              <CardTitle className="text-2xl md:text-3xl text-center text-white">
                {aulaAtual.titulo}
              </CardTitle>
              <p className="text-center text-educational-card/90 text-base md:text-lg">
                📅 {dataFormatada} • {turmaAtual}º Ano
              </p>
            </CardHeader>
          </Card>
          
          <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
            {aulaAtual.conteudo.map((slide, index) => renderSlide(slide, index))}
          </div>
          
          <Card className="border-educational-warning/40 shadow-md">
            <CardHeader 
              className="bg-educational-warning/30 cursor-pointer flex flex-row items-center justify-between p-4 rounded-t-lg active:scale-[0.98] transition-transform"
              onClick={() => setNotasVisiveis(!notasVisiveis)}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-sm md:text-base">Notas para o Professor</span>
              </div>
              <Badge variant="outline" className="text-xs md:text-sm">
                {notasVisiveis ? '▲' : '▼'}
              </Badge>
            </CardHeader>
            {notasVisiveis && (
              <CardContent className="bg-educational-warning/10 whitespace-pre-line p-4 md:p-6 text-sm md:text-base">
                {aulaAtual.notasProfessor}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default DiarioPedagogico;