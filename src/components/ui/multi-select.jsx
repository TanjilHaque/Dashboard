import * as React from "react";
import { X, Check } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MultiSelect({
  options = [],
  defaultValue = [],
  onValueChange,
}) {
  const [selected, setSelected] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);

  const toggleSelect = (value) => {
    let newValues;
    if (selected.includes(value)) {
      newValues = selected.filter((v) => v !== value);
    } else {
      newValues = [...selected, value];
    }
    setSelected(newValues);
    onValueChange(newValues);
  };

  const removeTag = (value) => {
    const newValues = selected.filter((item) => item !== value);
    setSelected(newValues);
    onValueChange(newValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selected.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {selected.map((value) => {
                const item = options.find((opt) => opt.value === value);
                return (
                  <Badge key={value} className="flex items-center gap-1">
                    {item?.label}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(value);
                      }}
                    />
                  </Badge>
                );
              })}
            </div>
          ) : (
            "Select subcategories"
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => toggleSelect(item.value)}
                  className="cursor-pointer"
                >
                  {item.label}
                  {selected.includes(item.value) && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
