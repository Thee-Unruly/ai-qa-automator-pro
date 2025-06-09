
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Play, Settings, ClipboardCheck, Loader2 } from 'lucide-react';

// Mock data
const mockProject = {
  id: '1',
  project_name: 'E-commerce Platform QA',
  created_at: '2024-06-01',
};

const mockTestResults = [
  { id: '1', test_type: 'Login Automation', result: 'Passed', created_at: '2024-06-09T10:30:00Z' },
  { id: '2', test_type: 'Payment Flow', result: 'Failed', created_at: '2024-06-09T11:15:00Z' },
  { id: '3', test_type: 'Cart Functionality', result: 'Passed', created_at: '2024-06-09T12:00:00Z' },
  { id: '4', test_type: 'Search Feature', result: 'Passed', created_at: '2024-06-09T14:20:00Z' },
];

export default function ProjectDetails() {
  const { id } = useParams();
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleRunAITest = async (testType: string) => {
    setIsRunningTest(true);
    // TODO: Implement AI test execution
    setTimeout(() => {
      setIsRunningTest(false);
    }, 3000);
  };

  const handleExportResults = async () => {
    setIsExporting(true);
    // TODO: Implement Excel export
    setTimeout(() => {
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{mockProject.project_name}</h1>
          <p className="text-muted-foreground">
            Created: {new Date(mockProject.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link to={`/projects/${id}/requirements`}>
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Requirements Analysis
            </Link>
          </Button>
          <Button variant="outline" onClick={handleExportResults} disabled={isExporting}>
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export Results
          </Button>
        </div>
      </div>

      {/* AI Actions */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Driven QA Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              onClick={() => handleRunAITest('automation')}
              disabled={isRunningTest}
              className="h-20 flex-col"
            >
              {isRunningTest ? (
                <Loader2 className="h-6 w-6 animate-spin mb-2" />
              ) : (
                <Play className="h-6 w-6 mb-2" />
              )}
              Run AI Test Automation
            </Button>
            
            <Button
              onClick={() => handleRunAITest('optimization')}
              disabled={isRunningTest}
              variant="outline"
              className="h-20 flex-col"
            >
              <Settings className="h-6 w-6 mb-2" />
              Optimize Test Cases
            </Button>
            
            <Button
              onClick={() => handleRunAITest('analysis')}
              disabled={isRunningTest}
              variant="outline"
              className="h-20 flex-col"
            >
              <ClipboardCheck className="h-6 w-6 mb-2" />
              Analyze Logs/Feedback
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Type</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTestResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.test_type}</TableCell>
                  <TableCell>
                    <Badge variant={result.result === 'Passed' ? 'default' : 'destructive'}>
                      {result.result}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(result.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
