
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Key, TestTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    groq: '',
    claude: ''
  });
  
  const [testConfig, setTestConfig] = useState({
    environment: 'staging',
    timeout: '30',
    retries: '3'
  });

  const handleSaveApiKeys = async () => {
    // TODO: Send API keys to Supabase Edge Function for secure storage
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been securely stored.",
    });
  };

  const handleSaveTestConfig = async () => {
    // TODO: Save test configuration
    toast({
      title: "Configuration Saved",
      description: "Your test configuration has been updated.",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* API Keys Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5" />
            API Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="openai-key">OpenAI API Key</Label>
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-..."
              value={apiKeys.openai}
              onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="groq-key">Groq API Key</Label>
            <Input
              id="groq-key"
              type="password"
              placeholder="gsk_..."
              value={apiKeys.groq}
              onChange={(e) => setApiKeys({ ...apiKeys, groq: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="claude-key">Claude API Key</Label>
            <Input
              id="claude-key"
              type="password"
              placeholder="sk-ant-..."
              value={apiKeys.claude}
              onChange={(e) => setApiKeys({ ...apiKeys, claude: e.target.value })}
            />
          </div>
          
          <Button onClick={handleSaveApiKeys} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save API Keys
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Test Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TestTube className="mr-2 h-5 w-5" />
            Test Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="environment">Test Environment</Label>
            <Select
              value={testConfig.environment}
              onValueChange={(value) => setTestConfig({ ...testConfig, environment: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="production">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="timeout">Test Timeout (seconds)</Label>
            <Input
              id="timeout"
              type="number"
              value={testConfig.timeout}
              onChange={(e) => setTestConfig({ ...testConfig, timeout: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="retries">Maximum Retries</Label>
            <Input
              id="retries"
              type="number"
              value={testConfig.retries}
              onChange={(e) => setTestConfig({ ...testConfig, retries: e.target.value })}
            />
          </div>
          
          <Button onClick={handleSaveTestConfig} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
