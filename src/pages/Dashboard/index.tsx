import { useEffect, useMemo, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

import { Bet, Group, RowItem } from "@/pages/Dashboard/types";
import { BetRow, Cell, HeaderRow, Layout, ListArea } from "@/pages/Dashboard/style";
import Basket from "@/components/Basket";
import { useBasket } from "@/context/BasketContext";

const TOTAL_TABLE_WIDTH = 1050;
const ROW_HEIGHT = 40;

const groupBets = (bets: Bet[]): Group[] => {
  const map = new Map<string, Group>();
  for (const bet of bets) {
    const key = `${bet.D}-${bet.LN}`;
    if (!map.has(key)) {
      map.set(key, { date: bet.D, day: bet.DAY, leagueName: bet.LN, bets: [] });
    }
    map.get(key)!.bets.push(bet);
  }
  return Array.from(map.values());
};

const tableItems = (groups: Group[]): RowItem[] => {
  const items: RowItem[] = [];
  for (const group of groups) {
    items.push({ type: "header", date: group.date, day: group.day, leagueName: group.leagueName });
    for (const bet of group.bets) {
      items.push({ type: "bet", bet });
    }
  }
  return items;
};

const subBetValues = (bet: Bet, ocgKey: string, ocKey: string): string =>
  bet.OCG[ocgKey]?.OC?.[ocKey]?.O ?? "";

function Row({ data, index, style }: ListChildComponentProps<RowItem[]>) {
  const item = data[index];
  const { toggleBet } = useBasket();

  if (item.type === "header") {
    return (
      <HeaderRow style={style}>
        <Cell>{item.date} {item.day} {item.leagueName}</Cell>
        <Cell>Yorumlar</Cell>
        <Cell />
        <Cell>1</Cell>
        <Cell>x</Cell>
        <Cell>2</Cell>
        <Cell>Alt</Cell>
        <Cell>Üst</Cell>
        <Cell>H1</Cell>
        <Cell>1</Cell>
        <Cell>x</Cell>
        <Cell>2</Cell>
        <Cell>H2</Cell>
        <Cell>1-X</Cell>
        <Cell>1-2</Cell>
        <Cell>X-2</Cell>
        <Cell>Var</Cell>
        <Cell>Yok</Cell>
        <Cell>+99</Cell>
      </HeaderRow>
    );
  }
  const { bet } = item;
  const handleClick = (oddType: string, oddValue: string) => {
    toggleBet({ id: `${bet.C}_${oddType}`, matchName: bet.N, betCode: bet.C, oddType, oddValue });
  };

  return (
    <BetRow style={style} $even={index % 2 === 0}>
      <Cell>{bet.C} {bet.T} {bet.N}</Cell>
      <Cell>Yorumlar</Cell>
      <Cell>{bet.OCG["1"]?.MBS ?? ""}</Cell>
      <Cell onClick={() => handleClick("1", subBetValues(bet, "1", "0"))}>{subBetValues(bet, "1", "0")}</Cell>
      <Cell onClick={() => handleClick("X", subBetValues(bet, "1", "1"))}>{subBetValues(bet, "1", "1")}</Cell>
      <Cell onClick={() => handleClick("2", subBetValues(bet, "1", "2"))}>{subBetValues(bet, "1", "2")}</Cell>
      <Cell onClick={() => handleClick("Alt", subBetValues(bet, "5", "25"))}>{subBetValues(bet, "5", "25")}</Cell>
      <Cell onClick={() => handleClick("Üst", subBetValues(bet, "5", "26"))}>{subBetValues(bet, "5", "26")}</Cell>
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell onClick={() => handleClick("1-X", subBetValues(bet, "2", "3"))}>{subBetValues(bet, "2", "3")}</Cell>
      <Cell onClick={() => handleClick("1-2", subBetValues(bet, "2", "4"))}>{subBetValues(bet, "2", "4")}</Cell>
      <Cell onClick={() => handleClick("X-2", subBetValues(bet, "2", "5"))}>{subBetValues(bet, "2", "5")}</Cell>
      <Cell />
      <Cell />
      <Cell>{Object.keys(bet.OCG).length}</Cell>
    </BetRow>
  );
}

const Dashboard = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    fetch("https://nesine-case-study.onrender.com/bets")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Bet[]) => setBets(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const items = useMemo(() => tableItems(groupBets(bets)), [bets]);

  if (loading) return <p>Yükleniyor</p>;
  if (error) return <p>Hata Mesajı: {error}</p>;

  return (
    <Layout>
      <ListArea>
        <FixedSizeList
          itemData={items}
          itemCount={items.length}
          itemSize={ROW_HEIGHT}
          height={windowHeight}
          width={TOTAL_TABLE_WIDTH}
        >
          {Row}
        </FixedSizeList>
      </ListArea>
      <Basket />
    </Layout>
  );
};

export default Dashboard;
