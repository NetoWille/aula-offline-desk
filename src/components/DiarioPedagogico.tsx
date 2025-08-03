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
      dias.push(<div key={`empty-${i}`} className="p-3"></div>);
    }
    
    // Dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataFormatada = `${anoAtual}-${String(mesAtual).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      const temAula = dadosDasAulas[turmaAtual]?.[dataFormatada];
      
      dias.push(
        <div
          key={dia}
          className={`p-3 text-center rounded-lg cursor-pointer transition-all hover:bg-primary/10 ${
            temAula 
              ? 'bg-primary text-primary-foreground font-bold hover:bg-primary/90' 
              : 'hover:bg-muted'
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
    const baseClasses = "p-6 rounded-lg border-l-4 border-primary";
    
    switch (slide.tipo) {
      case 'titulo':
        return (
          <div key={index} className={`${baseClasses} bg-primary/5 text-center`}>
            <h3 className="text-2xl font-bold text-primary">{slide.texto}</h3>
          </div>
        );
      case 'conceito':
        return (
          <div key={index} className={`${baseClasses} bg-muted/50`}>
            <div className="text-lg leading-relaxed whitespace-pre-line">
              {slide.texto}
            </div>
          </div>
        );
      case 'formula':
        return (
          <div key={index} className={`${baseClasses} bg-accent/10 border-accent text-center`}>
            <div className="text-xl font-mono bg-card p-4 rounded border-2 border-accent">
              <div className="whitespace-pre-line">{slide.texto}</div>
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
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 pb-6 border-b-4 border-primary">
            <h1 className="text-4xl font-bold text-primary mb-4">📚 Diário de Aulas Digital</h1>
            <p className="text-xl text-muted-foreground">Selecione uma turma para acessar o calendário de aulas</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { ano: '6', nome: 'Matemática Fundamental' },
              { ano: '7', nome: 'Álgebra Básica' },
              { ano: '9', nome: 'Função Quadrática' }
            ].map((turma) => (
              <Card 
                key={turma.ano}
                className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0"
                onClick={() => mostrarCalendario(turma.ano)}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{turma.ano}º Ano</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-primary-foreground/90">{turma.nome}</p>
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
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setTelaAtual('turmas')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar às Turmas
              </Button>
              <h2 className="text-3xl font-bold text-primary">Calendário - {turmaAtual}º Ano</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => mudarMes(-1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xl font-semibold min-w-[200px] text-center">
                {nomesMeses[mesAtual - 1]} {anoAtual}
              </span>
              <Button variant="outline" onClick={() => mudarMes(1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                  <div key={dia} className="p-3 text-center font-bold text-primary bg-primary/10 rounded">
                    {dia}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {renderizarCalendario()}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
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
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => setTelaAtual('calendario')}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Calendário
          </Button>
          
          <Card className="mb-6">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
              <CardTitle className="text-3xl text-center text-white">{aulaAtual.titulo}</CardTitle>
              <p className="text-center text-primary-foreground/90 text-lg">
                📅 {dataFormatada} • {turmaAtual}º Ano
              </p>
            </CardHeader>
          </Card>
          
          <div className="space-y-6 mb-8">
            {aulaAtual.conteudo.map((slide, index) => renderSlide(slide, index))}
          </div>
          
          <Card className="border-accent">
            <CardHeader 
              className="bg-accent/20 cursor-pointer flex flex-row items-center justify-between"
              onClick={() => setNotasVisiveis(!notasVisiveis)}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span className="font-bold">Notas para o Professor</span>
              </div>
              <Badge variant="outline">{notasVisiveis ? '▲' : '▼'}</Badge>
            </CardHeader>
            {notasVisiveis && (
              <CardContent className="bg-accent/5 whitespace-pre-line">
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