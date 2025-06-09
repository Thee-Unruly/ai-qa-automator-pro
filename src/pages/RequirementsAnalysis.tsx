
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, Brain, FileText, Settings } from 'lucide-react';

// Mock data
const mockRequirements = [
  {
    id: '1',
    requirement_text: 'User should be able to login with email and password',
    analyzed_output: 'Test scenarios: Valid login, Invalid credentials, Empty fields, Password reset flow',
    test_cases: 'Test case 1: Valid login\nTest case 2: Invalid password\nTest case 3: Empty email field',
    created_at: '2024-06-09T10:00:00Z'
  },
  {
    id: '2',
    requirement_text: 'Shopping cart should persist items across sessions',
    analyzed_output: 'Test scenarios: Add items, Browser refresh, Session timeout, Multiple devices',
    test_cases: 'Test case 1: Add item and refresh\nTest case 2: Session timeout handling\nTest case 3: Cross-device sync',
    created_at: '2024-06-09T11:00:00Z'
  }
];

export default function RequirementsAnalysis() {
  const { id } = useParams();
  const [requirementText, setRequirementText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleAnalyzeRequirements = async () => {
    setIsAnalyzing(true);
    // TODO: Call Claude API via Supabase Edge Function
    setTimeout(() => {
      setIsAnalyzing(false);
      setRequirementText('');
    }, 3000);
  };

  const handleGenerateTestCases = async () => {
    setIsGenerating(true);
    // TODO: Call OpenAI API via Supabase Edge Function
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleOptimizeTestCases = async () => {
    setIsOptimizing(true);
    // TODO: Call Groq API via Supabase Edge Function
    setTimeout(() => {
      setIsOptimizing(false);
    }, 3000);
  };

  const handleExportRequirements = async () => {
    setIsExporting(true);
    // TODO: Implement Excel export for requirements
    setTimeout(() => {
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Requirements Analysis</h1>
        <Button variant="outline" onClick={handleExportRequirements} disabled={isExporting}>
          {isExporting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Export Analysis
        </Button>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Requirement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="requirement">Requirement Text</Label>
            <Textarea
              id="requirement"
              placeholder="Enter your requirement here..."
              value={requirementText}
              onChange={(e) => setRequirementText(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleAnalyzeRequirements}
              disabled={!requirementText || isAnalyzing}
            >
              {isAnalyzing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Brain className="mr-2 h-4 w-4" />
              )}
              Analyze Requirements
            </Button>
            
            <Button
              variant="outline"
              onClick={handleGenerateTestCases}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              Generate Test Cases
            </Button>
            
            <Button
              variant="outline"
              onClick={handleOptimizeTestCases}
              disabled={isOptimizing}
            >
              {isOptimizing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Settings className="mr-2 h-4 w-4" />
              )}
              Optimize Test Cases
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requirements List */}
      <Card>
        <CardHeader>
          <CardTitle>Analyzed Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {mockRequirements.map((req) => (
              <AccordionItem key={req.id} value={req.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center justify-between w-full mr-4">
                    <span className="font-medium">{req.requirement_text}</span>
                    <Badge variant="outline">
                      {new Date(req.created_at).toLocaleDateString()}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Analysis Output:</h4>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                        {req.analyzed_output}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Generated Test Cases:</h4>
                      <pre className="text-sm text-muted-foreground bg-muted p-3 rounded whitespace-pre-wrap">
                        {req.test_cases}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
