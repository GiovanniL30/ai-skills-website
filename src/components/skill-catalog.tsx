'use client';

import { SearchIcon } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { categories, type Category } from '@/lib/skills';

interface CatalogEntry {
  slug: string;
  category: Category;
  searchText: string;
  card: ReactNode;
}

export function SkillCatalog({ entries }: { entries: CatalogEntry[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const searchRef = useRef<HTMLInputElement>(null);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visibleEntries = entries.filter(
    (entry) =>
      (category === 'All' || entry.category === category) &&
      terms.every((term) => entry.searchText.includes(term))
  );

  function reset() {
    setQuery('');
    setCategory('All');
    searchRef.current?.focus();
  }

  return (
    <section aria-label="Skills catalog" className="flex flex-col gap-8">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="skill-search">Find a skill</FieldLabel>
          <Input
            ref={searchRef}
            id="skill-search"
            type="search"
            placeholder="Search skills, descriptions, or use cases…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-12"
            aria-describedby="search-description"
          />
          <FieldDescription id="search-description">
            Search by name, what a skill does, or the task you have in mind.
          </FieldDescription>
        </Field>
        <FieldSet>
          <FieldLegend variant="label">Category</FieldLegend>
          <ToggleGroup
            aria-label="Filter by category"
            value={[category]}
            onValueChange={(values) => setCategory(values[0] ?? 'All')}
            variant="outline"
            className="max-w-full flex-wrap"
            spacing={2}
          >
            {['All', ...categories].map((value) => (
              <ToggleGroupItem key={value} value={value} className="min-h-11">
                {value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </FieldSet>
      </FieldGroup>
      <div className="flex items-center justify-between gap-4">
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-muted-foreground"
        >
          {visibleEntries.length} {visibleEntries.length === 1 ? 'skill' : 'skills'}
          {query || category !== 'All' ? ' found' : ' to explore'}
        </p>
        {(query || category !== 'All') && (
          <Button variant="ghost" className="min-h-11" onClick={reset}>
            Reset filters
          </Button>
        )}
      </div>
      {visibleEntries.length > 0 ? (
        <div className="grid min-w-0 gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {visibleEntries.map((entry) => (
            <div key={entry.slug} className="min-w-0">
              {entry.card}
            </div>
          ))}
        </div>
      ) : (
        <Empty className="min-h-72 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>No skills found</EmptyTitle>
            <EmptyDescription>Try a broader search or reset the category filter.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button className="min-h-11" onClick={reset}>
              Show all skills
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </section>
  );
}
