import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { addAddressApi } from "@/api/services/profile/profile.service";

function AddAddressCard({ onSuccess }: { onSuccess: () => void }) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addAddressApi({ address, city, postal });

      setOpen(false);
      onSuccess();

      setAddress("");
      setCity("");
      setPostal("");
    } catch (err) {
      console.error("Failed to add address:", err);
      alert("Gagal menambahkan alamat, silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm max-w-md bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>Click save when you're done.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label>Address</Label>
              <Input
                placeholder="address..."
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Label>City</Label>
              <Input
                placeholder="city..."
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Label>Postal</Label>
              <Input
                placeholder="postal..."
                type="text"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAddressCard;
