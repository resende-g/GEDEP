import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = {
  title: "O Discurso",
  description: "Carta de Princípios do GEDEP.",
};

export default function ODiscursoPage() {
  return (
    <main className="page-shell site-container">
      <PageHeading
        eyebrow="Documento central"
        title="O Discurso"
        description="Carta de Princípios do GEDEP"
      />

      <nav className="principles-lead" aria-label="Partes da Carta de Princípios">
        <a href="#carta-comunista">
          <p className="eyebrow">Parte I</p>
          <h2>Carta de Princípios Comunistas</h2>
          <p>Preâmbulo e princípios assentados coletivamente no primeiro encontro do GEDEP.</p>
        </a>
        <a href="#principios-gedepeanos">
          <p className="eyebrow">Parte II</p>
          <h2>Princípios Gedepeanos</h2>
          <p>Premissas irrenunciáveis que orientam a construção e a práxis do grupo.</p>
        </a>
      </nav>

      <article className="principles-document narrow">
        <header className="principles-title" id="carta-comunista">
          <p className="eyebrow">Documento integral</p>
          <h2>Carta de Princípios Comunistas</h2>
          <p>Grupo de Estudos em Direito e Economia Política (GEDEP)</p>
        </header>

        <section className="prose principles-section" aria-labelledby="preambulo">
          <h3 id="preambulo">Preâmbulo</h3>
          <p>
            &quot;proletários de todos os países, uni-vos&quot;, clamaram Karl Marx e Friedrich Engels no Manifesto Comunista de 1848. Vladimir Ilicth Lenin escrevia em 1917: &quot;para alcançar a paz (e, mais ainda, para alcançar uma paz realmente democrática, realmente honrosa), é preciso que o poder de Estado não pertença aos latifundiários e aos capitalistas, mas aos operários e aos camponeses mais pobres&quot;. Na 11ª tese sobre Feurbach se exclamava: &quot;Os filósofos têm apenas interpretado o mundo de maneiras diferentes; a questão, porém, é transformá-lo&quot;.
          </p>
          <p>
            A construção marxista ao longo da história nos trouxe até este momento, onde fome, guerras e opressões ainda assolam e exterminam a classe trabalhadora. Onde a revolução se faz mais urgente do que nunca. E sob os princípios comunistas nos ergueremos e continuaremos, juntos, a viver e a lutar.
          </p>
          <p>
            E a história nos impera a relembrar não só os grandes nomes e as grandes lutas da classe trabalhadora, como também o primeiro encontro do Grupo de Estudos em Direito e Economia Política (GEDEP), na qual assentamos, coletivamente, os seguintes princípios:
          </p>
          <ol>
            <li>Aqui é um espaço anticapitalista. Se você acredita que é possível reformar o capitalismo, que é possível a libertação da classe trabalhadora dentro da sociedade capitalista, aqui não é o seu espaço. Aqui nós lutamos com o marxismo, seguimos o marxismo revolucionário, é uma luta pela revolução e pelo socialismo. A esquerda liberal é reformista, pacifista. A extrema direita radicalizou o processo, então precisamos estar armados contra as opressões também;</li>
            <li>Aqui é um espaço em que lutamos contra o racismo. A classe trabalhadora, negra, os quilombolas, os indígenas, todos se comprometem com essa luta. A luta anticapitalista está associada à luta antirracista. Devemos ter uma solidariedade que construa, na prática, o antirracismo;</li>
            <li>Aqui a luta antissexista é essencial para a luta anticapitalista. Não só contra o machismo, mas também respeitando a luta LGBTQIAPN+. Aqui lutamos contra todas as formas de opressão, não há espaço para qualquer tipo de preconceito. Aqui é um espaço no qual as mulheres sintam-se à vontade para participar e construir a luta revolucionária, sem amarras da supremacia branca e masculina;</li>
            <li>Aqui não é um espaço esporádico. Aqui estamos propondo regularidade, disciplina, constância, projeto estratégico. Chegar no horário é essencial. Se a direita se encontra toda semana para oprimir a classe trabalhadora, também precisamos nos organizar e enfrentá-la;</li>
            <li>A importância de uma mesa farta de alimentos. Todos participam da produção da riqueza e irão se apropriar dela. A cada um conforme a sua possibilidade e necessidade, isso é o comunismo, precisamos ter uma perspectiva e responsabilização coletiva.</li>
          </ol>
          <p>
            Em respeito ao movimento construído pelo GEDEP em sua origem, é preciso memorizá-la e, sobretudo, fazê-la crescer pela força revolucionária dos seus membros. As principiologias aqui construídas nos levam ao horizonte imprescindível da luta proletária, na qual são irrenunciáveis as seguintes premissas:
          </p>
        </section>

        <section className="prose principles-section" aria-labelledby="principios-gedepeanos">
          <h2 id="principios-gedepeanos">Princípios Gedepeanos</h2>
          <ol>
            <li>O GEDEP é fundado sob as bases do materialismo histórico e dialético, a única teoria que permite à classe trabalhadora superar as contradições postas e se emancipar, o único método de compreensão da realidade a serviço da classe trabalhadora que permitirá a ela superar as opressões e alcançar o próximo passo da humanidade: o comunismo;</li>
            <li>O GEDEP é anticapitalista, significando dizer que se compromete na luta contra o modo de produção capitalista, contra a primazia da coisa em detrimento do ser, do capital em detrimento do humano;</li>
            <li>O GEDEP é antirracista, significando dizer que se compromete na luta contra o racismo estrutural em todas as suas manifestações;</li>
            <li>O GEDEP é antissexista, significando dizer que se compromete na luta contra o patriarcado e o machismo em todas as suas manifestações;</li>
            <li>O GEDEP é anti-LGBTQIA+fóbico, significando dizer que se compromete na luta contra a LGBTQIA+fobia em todas as suas manifestações;</li>
            <li>O GEDEP é anticapacitista, significando dizer que se compromete na luta contra o capacitismo em todas as suas manifestações;</li>
            <li>O GEDEP é antissionista, significando dizer que se compromete na luta a favor do povo palestino, em sua solidariedade e pela sua libertação, bem como a de todos os outros povos submetidos ao colonialismo;</li>
            <li>O GEDEP se alia às causas de todos os movimentos sociais e contra todas as formas de opressão, pela proteção de todo e qualquer ser e do meio ambiente;</li>
            <li>O GEDEP é um grupo de estudos plural e fomenta entre os seus membros a necessidade de se organizar coletivamente em qualquer tipo de agrupamento, desde que comprometido com a luta anticapitalista e contra as opressões;</li>
            <li>O GEDEP é comunista, significando dizer que somos construídos de forma a dar a cada um segundo a sua capacidade e a cada um segundo a sua necessidade;</li>
            <li>O GEDEP é orientado pela práxis, significando dizer que a teoria revolucionária e a prática devem estar em conjunto, eis que a teoria guia a prática e a prática corrige a teoria;</li>
            <li>O GEDEP, mais do que interpretar o mundo, busca a sua transformação!</li>
          </ol>
        </section>
      </article>
    </main>
  );
}
