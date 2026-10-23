'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function IngestForm() {
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    try {
      const response = await fetch('/api/v1/ingest', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? result.error);
      toast.success('Knowledge added successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add knowledge'
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Add source</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text">
          <TabsList>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <form action={submit} className="space-y-4 pt-4">
              <input type="hidden" name="type" value="text" />
              <div className="space-y-2">
                <Label htmlFor="title">Source title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Knowledge</Label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={10}
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
                />
              </div>
              <Button disabled={pending}>
                {pending ? 'Processing...' : 'Add knowledge'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="pdf">
            <form action={submit} className="space-y-4 pt-4">
              <input type="hidden" name="type" value="pdf" />
              <div className="space-y-2">
                <Label htmlFor="file">PDF file</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  required
                />
              </div>
              <Button disabled={pending}>
                {pending ? 'Processing...' : 'Upload PDF'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
