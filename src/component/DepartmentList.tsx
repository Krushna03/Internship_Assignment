import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox, ListItemIcon, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { departments } from '../data/departments';


const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const [selectedDepartments, setSelectedDepartments] = useState<{ [key: number]: boolean }>({});
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (id: number) => {
    setOpen((prevOpen) => ({
      ...prevOpen, [id]: !prevOpen[id],
    }));
  };

  const handleSelect = (id: number, subIds: number[]) => {
    const newSelectedDepartments = { ...selectedDepartments };
    const newSelectedSubDepartments = { ...selectedSubDepartments };
    const allSubSelected = subIds.every(subId => newSelectedSubDepartments[subId]);

    if (newSelectedDepartments[id] || allSubSelected) {
      delete newSelectedDepartments[id];
      subIds.forEach(subId => delete newSelectedSubDepartments[subId]);
    } else {
      newSelectedDepartments[id] = true;
      subIds.forEach(subId => newSelectedSubDepartments[subId] = true);
    }
    setSelectedDepartments(newSelectedDepartments);
    setSelectedSubDepartments(newSelectedSubDepartments);
  };


  const handleSubSelect = (parentId: number, subId: number) => {
    const newSelectedDepartments = { ...selectedDepartments };
    const newSelectedSubDepartments = { ...selectedSubDepartments };
    newSelectedSubDepartments[subId] = !newSelectedSubDepartments[subId];

    const parent = departments.find(dept => dept.id === parentId);
    if (parent) {
      const allSubSelected = parent.subDepartments.every(sub => newSelectedSubDepartments[sub.id]);
      newSelectedDepartments[parentId] = allSubSelected;
    }
    setSelectedDepartments(newSelectedDepartments);
    setSelectedSubDepartments(newSelectedSubDepartments);
  };

  
  return (
    <List>
      {departments.map((department) => (
        <React.Fragment key={department.id}>
         
          <ListItem className='bg-gray-200'>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!!selectedDepartments[department.id]}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelect(department.id, department.subDepartments.map(sub => sub.id));
                  }}
                />
              </ListItemIcon>
              
              <ListItemText primary={department.name} onClick={() => handleToggle(department.id)} />

              <IconButton 
                  edge="end" 
                  onClick={() => handleToggle(department.id)}>
                  {open[department.id] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
          </ListItem>


          <Collapse in={open[department.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                
              <ListItem key={subDepartment.id} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={!!selectedSubDepartments[subDepartment.id]}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSubSelect(department.id, subDepartment.id);
                      }}
                    />
                  </ListItemIcon>
                  
                  <ListItemText primary={subDepartment.name} />
              </ListItem>
              ))}
            </List>
          </Collapse>

        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
