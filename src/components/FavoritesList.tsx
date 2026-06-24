import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useFavorites } from '../FavoritesContext';
import type { FavoritedPlayer } from '../types';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-card);
  border-radius: 10px;
  padding: 10px 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.07);
  cursor: pointer;

  &:hover {
    background: var(--hover-row);
  }
`;

const DragHandle = styled.button`
  all: unset;
  cursor: grab;
  color: var(--star-inactive);
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
  touch-action: none;
  position: relative;
  z-index: 1;

  &:active {
    cursor: grabbing;
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const PlayerName = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClubName = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RemoveButton = styled.button`
  all: unset;
  cursor: pointer;
  color: var(--star-inactive);
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition: color 0.12s ease;

  &:hover {
    color: var(--accent-singles);
  }
`;

function SortableRow({ fav }: { fav: FavoritedPlayer }) {
  const { removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: fav.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Row ref={setNodeRef} style={style} onClick={() => navigate(`/player/${fav.id}`)}>
      <DragHandle
        {...attributes}
        {...listeners}
        title="Versleep om te herordenen"
        onClick={e => e.stopPropagation()}
      >
        <i className="ti ti-grip-vertical" />
      </DragHandle>
      <PlayerInfo>
        <PlayerName>{fav.name}</PlayerName>
        <ClubName>{fav.club}</ClubName>
      </PlayerInfo>
      <RemoveButton
        onClick={e => { e.stopPropagation(); removeFavorite(fav.id); }}
        title="Verwijder uit favorieten"
        aria-label={`Verwijder ${fav.name} uit favorieten`}
      >
        <i className="ti ti-x" />
      </RemoveButton>
    </Row>
  );
}

export function FavoritesList() {
  const { favorites, reorderFavorites } = useFavorites();
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = favorites.findIndex(f => f.id === active.id);
      const newIndex = favorites.findIndex(f => f.id === over.id);
      reorderFavorites(arrayMove(favorites, oldIndex, newIndex));
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={favorites.map(f => f.id)} strategy={verticalListSortingStrategy}>
        <List>
          {favorites.map(fav => (
            <SortableRow key={fav.id} fav={fav} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}
