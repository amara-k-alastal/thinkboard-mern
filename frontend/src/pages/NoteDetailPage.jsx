import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Trash2Icon } from "lucide-react"; 

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!note.titel.trim() || !note.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, {
        titel: note.titel,
        content: note.content,
      });

      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error updating note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary">Loading note...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Note not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Notes
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/notes/${id}`);

      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="btn btn-ghost mb-6">
          ← Back to Notes
        </Link>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              Edit Note
            </h2>

            <form onSubmit={handleSave}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>

                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={note.titel}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      titel: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>

                <textarea
                  className="textarea textarea-bordered h-32 w-full"
                  value={note.content}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      content: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="card-actions justify-between items-center">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error btn-outline"
                >
                  <Trash2Icon className="size-4" />
                  Delete Note
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;