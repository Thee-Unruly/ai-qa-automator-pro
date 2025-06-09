
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const mockProjects = [
  { id: '1', project_name: 'E-commerce Platform QA', created_at: '2024-06-01', test_count: 25 },
  { id: '2', project_name: 'Mobile App Testing', created_at: '2024-06-05', test_count: 18 },
  { id: '3', project_name: 'API Integration Tests', created_at: '2024-06-08', test_count: 14 },
];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const filteredProjects = mockProjects.filter(project =>
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProject = () => {
    // TODO: Implement project creation with Supabase
    console.log('Creating project:', newProjectName);
    setIsCreateDialogOpen(false);
    setNewProjectName('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject}>Create Project</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{project.project_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(project.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tests: {project.test_count}
                </p>
                <Button className="w-full mt-4" asChild>
                  <Link to={`/projects/${project.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
