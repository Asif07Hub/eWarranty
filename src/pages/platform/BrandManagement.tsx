
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useBrands } from '@/contexts/BrandContext';
import { Brand } from '@/types';
import { useToast } from '@/hooks/use-toast';

const PlatformBrandManagement = () => {
  const { brands, addBrand, updateBrand, deleteBrand } = useBrands();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    color: '#3B82F6'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      displayName: '',
      color: '#3B82F6'
    });
  };

  const handleCreate = () => {
    if (!formData.name || !formData.displayName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    addBrand({
      name: formData.name.toLowerCase().replace(/\s+/g, '-'),
      displayName: formData.displayName,
      color: formData.color,
      isActive: true
    });

    toast({
      title: "Success",
      description: "Brand created successfully"
    });

    resetForm();
    setIsCreateOpen(false);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      displayName: brand.displayName,
      color: brand.color
    });
  };

  const handleUpdate = () => {
    if (!editingBrand) return;

    updateBrand(editingBrand.id, {
      name: formData.name.toLowerCase().replace(/\s+/g, '-'),
      displayName: formData.displayName,
      color: formData.color
    });

    toast({
      title: "Success",
      description: "Brand updated successfully"
    });

    setEditingBrand(null);
    resetForm();
  };

  const handleDelete = (brand: Brand) => {
    if (window.confirm(`Are you sure you want to delete ${brand.displayName}?`)) {
      deleteBrand(brand.id);
      toast({
        title: "Success",
        description: "Brand deleted successfully"
      });
    }
  };

  const toggleBrandStatus = (brand: Brand) => {
    updateBrand(brand.id, { isActive: !brand.isActive });
    toast({
      title: "Success",
      description: `Brand ${brand.isActive ? 'deactivated' : 'activated'} successfully`
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Brand Management"
        description="Manage brands across all tenant organizations"
        action={
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-glow">
                <Plus className="h-4 w-4 mr-2" />
                Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Brand</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Brand Name (URL)</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., volta"
                  />
                </div>
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="e.g., Volta"
                  />
                </div>
                <div>
                  <Label htmlFor="color">Brand Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="color"
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreate} className="bg-gradient-primary">
                    Create Brand
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card key={brand.id} className="bg-gradient-card shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-6 h-6 rounded-full shadow-sm"
                    style={{ backgroundColor: brand.color }}
                  />
                  <CardTitle className="text-lg">{brand.displayName}</CardTitle>
                </div>
                <Badge 
                  variant={brand.isActive ? "default" : "secondary"}
                  className={brand.isActive ? "bg-green-100 text-green-800" : ""}
                >
                  {brand.isActive ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {brand.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">URL Name:</span>
                  <span className="font-mono bg-muted px-2 py-1 rounded text-xs">
                    {brand.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Color:</span>
                  <span className="font-mono text-xs">{brand.color}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="text-xs">
                    {brand.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleBrandStatus(brand)}
                  className="text-xs"
                >
                  {brand.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(brand)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(brand)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingBrand} onOpenChange={() => setEditingBrand(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Brand Name (URL)</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., volta"
              />
            </div>
            <div>
              <Label htmlFor="edit-displayName">Display Name</Label>
              <Input
                id="edit-displayName"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="e.g., Volta"
              />
            </div>
            <div>
              <Label htmlFor="edit-color">Brand Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="edit-color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-16 h-10"
                />
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="#3B82F6"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingBrand(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} className="bg-gradient-primary">
                Update Brand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlatformBrandManagement;
