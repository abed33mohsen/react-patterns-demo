export default function ProfileEditModal({
  errorMessage,
  formState,
  isOpen,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(event) => event.stopPropagation()}>
        <div className="profile-modal-head">
          <div>
            <p className="profile-kicker">Edit Profile</p>
            <h3>Update your profile content</h3>
          </div>
          <button className="profile-close-button" onClick={onClose}>Close</button>
        </div>

        <form className="profile-form" onSubmit={onSubmit}>
          <label className="profile-field">
            <span>Name</span>
            <input type="text" name="name" value={formState.name} onChange={onChange} />
          </label>
          <label className="profile-field">
            <span>Role</span>
            <input type="text" name="role" value={formState.role} onChange={onChange} />
          </label>
          <label className="profile-field">
            <span>Title</span>
            <input type="text" name="title" value={formState.title} onChange={onChange} />
          </label>
          <label className="profile-field">
            <span>Description</span>
            <textarea name="description" value={formState.description} onChange={onChange} rows="4" />
          </label>
          <label className="profile-field">
            <span>Overview Title</span>
            <input type="text" name="overviewTitle" value={formState.overviewTitle} onChange={onChange} />
          </label>
          <label className="profile-field">
            <span>Overview Text</span>
            <textarea name="overviewText" value={formState.overviewText} onChange={onChange} rows="4" />
          </label>
          {errorMessage ? <p className="profile-error-message">{errorMessage}</p> : null}

          <div className="profile-form-actions">
            <button type="button" className="profile-button secondary ui-button ui-button--secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="profile-button primary ui-button ui-button--primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
